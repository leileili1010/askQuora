
import { Link} from "react-router-dom";
const QuestionListItem = ({question}) => {
    let answer;
    if (question.numOfAnswers < 1) answer = "No answers yet"
    if (question.numOfAnswers == 1) answer = `${question.numOfAnswers} answer`
    else answer = `${question.numOfAnswers} answers`

    return (
        <li className="question-container">
            <p>{question.title}</p>
            <p>{question.description}</p>
            <Link> 
            {answer}
            </Link> 
            <div>
                <i className="fa-regular fa-pen-to-square"></i> <span>Answer</span>
            </div>
        </li>
    )
}

export default QuestionListItem;