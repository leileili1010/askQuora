import { useParams } from "react-router-dom";
import {thunkGetQuestion} from '../../../redux/question'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OperationButton from "./OperationButton";

const QuestionDetail = () => {
    const {questionId} = useParams();
    const dispatch = useDispatch();
    const question = useSelector(state => state.questions[questionId])
    const user = useSelector(state => state.session.user)
    const isOwner = user?.id == question?.owner.id
    
    useEffect(() => {
        dispatch(thunkGetQuestion(questionId))
    }, [dispatch, questionId])

    if (!question) return null
    
    return (
        <div>
            <p>{question?.title}</p>
            <div>
                <i className="fa-regular fa-pen-to-square"></i> <span>Answer</span>
            </div>
            {isOwner && (
                <div className = "operation-button">
                    <OperationButton question={question}/>
                </div>
            )}
        </div>
    )
}

export default QuestionDetail;