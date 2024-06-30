import AnswerListItem from "./AnswerListItem";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllAnswers, returnInitial } from "../../../redux/answer";
import InfiniteScroll from 'react-infinite-scroll-component';
import { createSelector } from 'reselect';
import Spinner from "../Spinner/Spinner";


const AnswerListHome = ({ initialLoad, setInitialLoad }) => {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [deleteA, setDeleteA] = useState(0)
    const [editA, setEditA] = useState(0)
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const selectAnswers = state => state.answers;
    const selectSortedAnswers = createSelector(
        [selectAnswers],
        (answers) => Object.values(answers).sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    );
    const sortedAnswers = useSelector(selectSortedAnswers);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                if (initialLoad) {
                    dispatch(returnInitial());
                    setPage(1);
                    setHasMore(true); 
                }
                const result = await dispatch(thunkGetAllAnswers(page));
                if (result.length === 0) {
                    setHasMore(false);
                }
                setInitialLoad(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [dispatch, editA, deleteA, page, initialLoad, setInitialLoad]);


    useEffect(() => {
        if (!user) navigate("/");
    }, [user, navigate]);

    if (!sortedAnswers.length) return null;

    return (
        <div className="answer-list-component">
            <InfiniteScroll
                dataLength={sortedAnswers.length}
                next={() => setPage(page + 1)}
                hasMore={hasMore}
            >
                {sortedAnswers.map(answer =>
                    <AnswerListItem answer={answer} setDeleteA={setDeleteA} setEditA={setEditA} key={answer.id} />
                )}
            </InfiniteScroll>
            {isLoading && <Spinner />}

        </div>
    )
}

export default AnswerListHome;

