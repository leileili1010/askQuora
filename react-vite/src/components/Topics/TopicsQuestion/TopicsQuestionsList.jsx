import QuestionListItem from "../../Questions/QuestionListItem/QuestionListItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { thunkGetTopicsQuestions, returnTopicInitial } from "../../../redux/topic"
import './TopicsQuestionsList.css'

const TopicsQuestionsList = () => {
    const dispatch = useDispatch()
    const [deleteQ, setDeleteQ] = useState(0);
    const [editQ, setEditQ] = useState(0);
    const topicsObj =  useSelector(state => state.topics)
    const topics = Object.values(topicsObj)
    
    useEffect(() => {
        dispatch(thunkGetTopicsQuestions());
        return () => {
            dispatch(returnTopicInitial());
        };
    }, [dispatch,deleteQ, editQ])
    
    if(topics.length == 0) return null;

 return (
        <div>
            <div id="topics-qlist" className="topics-questions-list">
                {topics.map(topic => (
                    <div key={topic.id} className="topics-qs">
                        <div className="topic-container">
                            <img src={topic.cover_img} alt="Topic image" />
                            <div className="topic-info">
                                <p>{topic.name}</p>
                                <p>{topic.description}</p>
                            </div>
                        </div>
                        
                        {topic && topic.questions && topic.questions.map(question => (
                            <QuestionListItem question={question} setDeleteQ={setDeleteQ} setEditQ={setEditQ} key={question.id} />
                        ))}
                        <div className="more">
                            More <i className="fa-solid fa-arrow-down"></i>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TopicsQuestionsList;