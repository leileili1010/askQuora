import { useSelector, useDispatch } from "react-redux";
import { useEffect} from "react";
import { thunkGetQuestions } from "../../../redux/question";
import QuestionListItem from "../QuestionListItem/QuestionListItem";

const QuestionList = () => {
    const dispatch = useDispatch();
    const questionObj = useSelector(state => state.questions)
    const questions = Object.values(questionObj)
    
    useEffect(() => {
        dispatch(thunkGetQuestions())
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

export default QuestionList;