import QuestionListItem from "../../Questions/QuestionListItem/QuestionListItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { thunkGetTopicsQuestions} from "../../../redux/topic"
import { thunkSetUserAnswers } from "../../../redux/session";
import Loader from "../../Loader/Loader";
import './TopicsQuestionsList.css'

const TopicsQuestionsList = ({sub}) => {
    const dispatch = useDispatch()
    const [deleteQ, setDeleteQ] = useState(0);
    const [editQ, setEditQ] = useState(0);
    const topicsObj =  useSelector(state => state.topics)
    const topics = Object.values(topicsObj)
    const [loading, setLoading] = useState(true);
    let subTopics;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await dispatch(thunkGetTopicsQuestions());
            setLoading(false);
        }
        fetchData();
    }, [dispatch,deleteQ, editQ])

    useEffect(() => {
        dispatch(thunkSetUserAnswers())
    }, [dispatch])
    
    if(topics.length == 0) return null;
    if (Object.keys(sub).length > 0 ) {
        subTopics = topics.filter(topic => topic.name === sub.name)
    }

    if (loading) {
        return (
            <div className="loader-container">
                <Loader />
            </div>
        ); 
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
                        
                        {topic && topic.questions && topic.questions.map(question => (
                            <QuestionListItem question={question} setDeleteQ={setDeleteQ} setEditQ={setEditQ} key={question.id} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TopicsQuestionsList;