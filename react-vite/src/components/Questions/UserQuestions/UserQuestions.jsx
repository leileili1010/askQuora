import {useSelector } from "react-redux";
import QuestionListItem from "../QuestionListItem/QuestionListItem";


const UserQuestions = ({questionsObj, questionTitle}) => {
    const user = useSelector(state => state.session.user)
    const questions = Object.values(questionsObj)


    if (questions.length == 0) return null

    return (
        <div>
            <p className="Q-A-title">{questionTitle}</p>
            <ul className="question-list">
                {questions.map((question) => (
                <QuestionListItem question={question} key={question.id} />
                ))}
            </ul>
        </div>
    )
}

export default UserQuestions;