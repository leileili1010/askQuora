import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetUserQuestions } from "../../../redux/question";
import QuestionListItem from "../QuestionListItem/QuestionListItem";


const UserQuestions = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const questionObj = useSelector(state => state.questions)
    const questions = Object.values(questionObj)

    useEffect(() => {
       dispatch(thunkGetUserQuestions())
    }, [dispatch])

    if (questions.length == 0) return null

    return (
        <div>
            <ul className="question-list">
                {questions.map((question) => (
                <QuestionListItem question={question} key={question.id} />
                ))}
            </ul>
        </div>
    )
}

export default UserQuestions;