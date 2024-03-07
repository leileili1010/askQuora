
import { Link} from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import OperationButton from "../QuestionDetail/OperationButton";
import OpenModalButtonProps from "../../OpenModalButton/OpenModalButtonProps";
import CreateAnswerModal from "../../Answers/CreateAnswer/CreateAnswer";
import "./QuestionListItem.css"


const QuestionListItem = ({question}) => {
    const user = useSelector(state => state.session.user)
    const isOwner = user?.id == question?.owner.id

    let answer;
    if (question.numOfAnswers > 1) answer =  `${question.numOfAnswers} answers`
    else if (question.numOfAnswers == 1) answer = `${question.numOfAnswers} answer`
    else answer = "No answers yet"
    
    return (
        <div key={question.id} className="question-container">
            
            <Link to={`/questions/${question.id}`} className="question-title">{question.title}</Link>
            
            <div className="button-link">
                
                <div className="create-answer-button">
                    {isOwner?
                        (
                            <Link className="answers-link" to={`/questions/${question.id}`}>Currently {answer} for your question </Link>
                        ):
                        (
                            <>
                                <div className="answer-modal">
                                <i className="fa-regular fa-pen-to-square"></i> 
                                <OpenModalButtonProps
                                buttonText="Answer"
                                modalComponent={props => <CreateAnswerModal {...props} />}
                                modalProps={{ question }}
                                />
                                </div>
                                <Link className="answers-link" to={`/questions/${question.id}`}> {answer}</Link> 
                            </>
                        )
                    }
                   
                </div>
                
                {isOwner && (
                <div className = "operation-button">
                        <OperationButton question={question}/>
                </div>
                )}

            </div>

        </div>
    )
}

export default QuestionListItem;