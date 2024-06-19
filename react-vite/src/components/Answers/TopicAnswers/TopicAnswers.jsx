import { useDispatch, useSelector } from "react-redux";
import { thunkGetTopicAnswers } from "../../../redux/answer";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import AnswerList from "../AnswerList/AnswerList";
import Navigation from "../../Navigation/Navigation";

const TopicAnswers = () => {
    const dispatch = useDispatch()
    const {topicId} = useParams()
    const answersObj = useSelector(state => state.answers)

    useEffect(() => {
        dispatch(thunkGetTopicAnswers(topicId))
    }, [dispatch, topicId])

    if (answersObj.length == 0) return null
    const answers = Object.values(answersObj)

    return (
        <div>
            <div>
                <Navigation />
            </div>
            <AnswerList answers = {answers}/>
        </div>
    )
}

export default TopicAnswers;