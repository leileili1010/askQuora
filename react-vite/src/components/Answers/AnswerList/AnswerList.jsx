import AnswerListItem from "./AnswerListItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import { thunkGetQuestionAnswers, returnInitial } from "../../../redux/answer";

const AnswerList = ({questionId}) => {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [editA, setEditA] = useState(0)
    const [deleteA, setDeleteA] = useState(0)
    // const [isLoading, setIsLoading] = useState(false);
    const answersObj = useSelector(state => state.answers)
    if (answersObj.length == 0) return null
    const answers = Object.values(answersObj)

    useEffect(() => {
        dispatch(thunkGetQuestionAnswers(questionId))
        return () => {
            dispatch(returnInitial());
          };
    }, [dispatch, questionId, editA, deleteA])

    // useEffect(() => {
    //     setIsLoading(true);
    //     setTimeout(() => {
    //         setIsLoading(false);
    //     }, 1500); 
    // }, []);

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
            {answers.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)).map(answer =>
               <AnswerListItem answer={answer} setDeleteA={setDeleteA} setEditA={setEditA} key={answer.id} />    
            )}
        </div>
    )
}

export default AnswerList;