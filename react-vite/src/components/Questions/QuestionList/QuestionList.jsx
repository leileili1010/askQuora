import { useSelector, useDispatch } from "react-redux";
import { useEffect} from "react";
import { thunkGetTopicQuestions, thunkGetQuestions } from "../../../redux/question";
import QuestionListItem from "../QuestionListItem/QuestionListItem";
import { useParams } from "react-router-dom";

const QuestionList = () => {
    const dispatch = useDispatch();
    const questionObj = useSelector(state => state.questions)
    const questions = Object.values(questionObj)
    const {topicId} = useParams()
    const sortedQuestions = questions.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    
    useEffect(() => {
        if (topicId) {
            dispatch(thunkGetTopicQuestions(topicId))
        } else {
            dispatch(thunkGetQuestions())
        }
    }, [dispatch, topicId])
    
    if (questions.length == 0) return null

    return (
        <div>
            <ul className="question-list">
                {sortedQuestions.map((question) => (
                <QuestionListItem question={question} key={question.id} />
                ))}
            </ul>
        </div>
    )
}

export default QuestionList;