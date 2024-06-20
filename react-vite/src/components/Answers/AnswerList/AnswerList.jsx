import AnswerListItem from "./AnswerListItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect} from "react";
import { useNavigate} from "react-router-dom";
import { thunkGetQuestionAnswers, returnInitial } from "../../../redux/answer";

const AnswerList = ({questionId, setDeleteA, setEditA, editA, deleteA}) => {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const answersObj = useSelector(state => state.answers)
    
    useEffect(() => {
        dispatch(thunkGetQuestionAnswers(questionId))
        return () => {
            dispatch(returnInitial());
        };
    }, [dispatch, questionId, editA, deleteA])
    
    
    useEffect(() => {
        if (!user) navigate("/");
    }, [user, navigate]);
    
    // if (answersObj.length == 0) return null
    const answers = Object.values(answersObj)
    if (!answers.length) return null;
    const sortedAnswers = answers.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));


    return (
        <div className="answer-list-component">
            {sortedAnswers.map(answer =>
               <AnswerListItem answer={answer} setDeleteA={setDeleteA} setEditA={setEditA} key={answer.id} />    
            )}
        </div>
    )
}

export default AnswerList;