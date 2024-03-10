import QuestionListItem from "../../Questions/QuestionListItem/QuestionListItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { thunkGetTopicsQuestions, returnTopicInitial } from "../../../redux/topic"
import './TopicsQuestionsList.css'

const TopicsQuestionsList = ({sub, setEditQ, setDeleteQ, topicsObj}) => {
    const topics = Object.values(topicsObj)
    let subTopics;
    
    if(topics.length == 0) return null;
    if (Object.keys(sub).length > 0 ) {
        subTopics = topics.filter(topic => topic.name === sub.name)
    }
    const topicsRendered = Object.keys(sub).length > 0 ? subTopics: topics

 return (
        <div>
            <div id="topics-qlist" className="topics-questions-list">
                {topicsRendered.map(topic => (
                    <div key={topic.id} className="topics-qs">
                        <div className="topic-container">
                            <img src={topic.cover_img} alt="Topic image" />
                            <div className="topic-info">
                                <p>{topic.name}</p>
                                <p>{topic.description}</p>
                            </div>
                        </div>
                        
                        {topic && topic.questions && topic.questions.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)).map(question => (
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