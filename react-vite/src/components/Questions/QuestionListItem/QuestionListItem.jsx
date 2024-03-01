
import { Link} from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import OperationButton from "../QuestionDetail/OperationButton";

const QuestionListItem = ({question}) => {
    const user = useSelector(state => state.session.user)
    const isOwner = user?.id == question?.owner.id

    let answer;
    if (question.numOfAnswers < 1) answer = "No answers yet"
    if (question.numOfAnswers == 1) answer = `${question.numOfAnswers} answer`
    else answer = `${question.numOfAnswers} answers`

    return (
        <li className="question-container">
            <p>{question.title}</p>
            <Link> 
                {answer}
            </Link> 
            <div>
                <i className="fa-regular fa-pen-to-square"></i> <span>Answer</span>
            </div>
            {isOwner && (
                <div className = "operation-button">
                    <OperationButton/>
                </div>
            )}
            
        </li>
    )
}

export default QuestionListItem;