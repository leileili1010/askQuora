import { thunkGetTopics } from "../../redux/topic";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { thunkGetTopicQuestions } from "../../redux/question";
import "./RecomendSpace.css";

const RecommendTopics = ({setSub, spaces, setTopicForUser}) => {
    const dispatch = useDispatch();
    const spaceIdArr = [11]
    if (spaces?.length) {
        spaces.forEach(space => spaceIdArr.push(space.topic.id))
    }
    const topicsObj =  useSelector(state => state.topics)
    const topics = Object.values(topicsObj)
    const recommendTopics = topics.filter(topic => !spaceIdArr.includes(topic.id))

    useEffect(() => {
        dispatch(thunkGetTopicQuestions())
    }, [dispatch])

    return (
        <div className="recomend-topic-container">
            <div className="recommend-title">
                <p>Recommended Topics</p>
            </div>

            <div id="recommendations">
                {recommendTopics?.map(topic =>
                    <div className="subscription" onClick={() => {setSub(topic); setTopicForUser(topic.id)}} key={topic.name}>
                        <img src={topic?.cover_img}/>
                        <div id="topics-for-u">
                            <p className="topic-for-u-name">{topic?.name}</p>
                            <p className="topic-for-u-num">{topic.num_of_subscriptions} subscribers</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default RecommendTopics;