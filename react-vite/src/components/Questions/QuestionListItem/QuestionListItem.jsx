
import { Link} from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import OperationButton from "../QuestionDetail/OperationButton";
import OpenModalButtonProps from "../../OpenModalButton/OpenModalButtonProps";
import CreateAnswerModal from "../../Answers/CreateAnswer/CreateAnswer";

const QuestionListItem = ({question}) => {
    const user = useSelector(state => state.session.user)
    const isOwner = user?.id == question?.owner.id

    let answer;
    if (question.numOfAnswers > 1) answer =  `${question.numOfAnswers} answers`
    else if (question.numOfAnswers == 1) answer = `${question.numOfAnswers} answer`
    else answer = "No answers yet"
    return (
        <li className="question-container">
            <p>{question.title}</p>
            <Link> 
                {answer}
            </Link> 
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
            
        </li>
    )
}

export default QuestionListItem;