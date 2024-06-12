import AnswerListItem from "./AnswerListItem";
import { useEffect, useState} from "react";
import { useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllAnswers } from "../../../redux/answer";
import InfiniteScroll from 'react-infinite-scroll-component';

const AnswerListHome = () => {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const answers = useSelector(state => Object.values(state.answers))
    const sortedAnswers = answers.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    const [deleteA, setDeleteA] = useState(0)
    const [editA, setEditA] = useState(0)
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false);

    // useEffect(() => {
    //     setIsLoading(true);
    //     setTimeout(() => {
    //         setIsLoading(false);
    //     }, 1500); 
    // }, []);

    useEffect(() => {
        setIsLoading(true); 
        try {
            dispatch(thunkGetAllAnswers(page));
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false); 
        }

    }, [dispatch, editA, deleteA, page]);


    useEffect(() => {
        if (!user) navigate("/");
      }, [user, navigate]);

    //   if (isLoading) return(
    //     <div className="answer-list-component">
    //         <div className="spinner">Loading...</div>
    //     </div>
    //   )

    if (!answers.length) return null;

    return (
        <div className="answer-list-component">
            <InfiniteScroll
                dataLength={answers.length}
                next = {() => setPage(page + 1)}
                hasMore={answers.length > 0}
            >
                {sortedAnswers.map(answer =>
                <AnswerListItem answer={answer} setDeleteA={setDeleteA} setEditA={setEditA} key={answer.id} />    
                )}
            </InfiniteScroll>
        </div>
    )
}

export default AnswerListHome;