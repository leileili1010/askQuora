import { useDispatch} from "react-redux";
import AnswerList from "../AnswerList/AnswerList";


const UserAnswers = ({answersObj, answerTitle}) => {
    const dispatch = useDispatch()

    if (answersObj.length == 0) return null
    const answers = Object.values(answersObj)
    
    return (
        <div id="user-answers">
            <p className="Q-A-title">{answerTitle}</p>
            <AnswerList answers = {answers}/>
        </div>
    )
}

export default UserAnswers