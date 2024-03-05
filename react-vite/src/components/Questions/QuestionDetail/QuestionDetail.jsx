import { useParams } from "react-router-dom";
import {thunkGetQuestion} from '../../../redux/question'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OperationButton from "./OperationButton";
import { thunkGetQuestionAnswers } from "../../../redux/answer";
import AnswerList from "../../Answers/AnswerList/AnswerList";
import OpenModalButtonProps from "../../OpenModalButton/OpenModalButtonProps";
import CreateAnswerModal from "../../Answers/CreateAnswer/CreateAnswer";
import Navigation from "../../Navigation/Navigation"
import { useNavigate} from "react-router-dom";
import "./QuestionDetail.css"


const QuestionDetail = () => {
    const {questionId} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const question = useSelector(state => state.questions[questionId])
    const user = useSelector(state => state.session.user)
    const isOwner = user?.id == question?.owner.id
    const answersObj = useSelector(state => state.answers)
    
    useEffect(() => {
        if (!user) navigate("/");
      }, [user, navigate]);
    
    useEffect(() => {
        dispatch(thunkGetQuestion(questionId))
    }, [dispatch, questionId])

    useEffect(() => {
        dispatch(thunkGetQuestionAnswers(questionId))
    }, [dispatch])

    if (!question) return null
    if (answersObj.length == 0) return null

    const answers = Object.values(answersObj)

    return (
        <div className="question-details">  
            <Navigation />

            <div  className="question-answers-container">
                <p className="qs-title">{question?.title}</p>
                <div className="create-answer-button">
                    <i className="fa-regular fa-pen-to-square"></i> 
                    <OpenModalButtonProps 
                        buttonText="Answer"
                        modalComponent={props => <CreateAnswerModal {...props} />}
                        modalProps={{ question }}
                    />
                </div>
                {isOwner && (
                    <div className = "operation-button">
                        <OperationButton question={question}/>
                    </div>
                )}
                <div className="answers-container">
                    <AnswerList answers = {answers}/>
                </div>

            </div>
        </div>
    )
}

export default QuestionDetail;