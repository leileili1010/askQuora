import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllAnswers, returnInitial } from "../../redux/answer";  
import { useEffect, useState } from "react";
import AnswerList from "../Answers/AnswerList/AnswerList";
import Navigation from "../Navigation/Navigation";
import { useNavigate} from "react-router-dom";
import "./HomePage.css"
import CreateQuestionModal from '../Questions/CreateQuestion/CreateQuestion'
import OpenModalButton from '../OpenModalButton/OpenModalButton'
import { thunkGetTopicsQuestions, returnTopicInitial } from "../../redux/topic";
import TopicsQuestionsList from "../Topics/TopicsQuestion/TopicsQuestionsList"
import { thunkSetUserAnswers } from "../../redux/session";

const HomePage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const answersObj = useSelector(state => state.answers)
    const user = useSelector(state => state.session.user)
    const profile_img = user?.profile_img
    const [activeTab, setActiveTab] = useState('answers');
    const [deleteQ, setDeleteQ] = useState(0);
    const [editQ, setEditQ] = useState(0);
    const topicsObj =  useSelector(state => state.topics)
    const topics = Object.values(topicsObj)

    useEffect(() => {
        if (!user) navigate("/");
      }, [user, navigate]);

    useEffect(() => {
        dispatch(thunkSetUserAnswers())
    }, [dispatch])

    useEffect(() => {
        dispatch(thunkGetAllAnswers());
        return () => {
            dispatch(returnInitial());
          };
    }, [dispatch])

    useEffect(() => {
        dispatch(thunkGetTopicsQuestions());
        return () => {
            dispatch(returnTopicInitial());
          };
    }, [dispatch,deleteQ, editQ])

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    if (answersObj.length == 0 && activeTab == 'answers') return null
    const answers = Object.values(answersObj)
    
    return (
        <div className="homepage">
            <div className="home-nav-bar">
                <Navigation />
            </div>

            <div className="topics">
                {/* spaces and topics*/}
                <div className="spaces-container"></div>

                 {/* spaces and topics*/}
                <div className="topic-answers">
                    <div className="ask-answer">
                        <div className="profile-question">
                            <img src={profile_img} className="profile-image" />
                            <OpenModalButton
                                buttonText="What do you want to ask or share?"
                                modalComponent={<CreateQuestionModal />}
                             />
                        </div>
                        <div className="ask-anwser-link">
                            <div className="ask-button">
                                <i className="fa-regular fa-message"></i> 
                                <OpenModalButton
                                buttonText="Ask"
                                modalComponent={<CreateQuestionModal />}
                             />
                            </div>
                            <div>
                                <i className="fa-regular fa-pen-to-square"></i> 
                                <span>Answer</span>
                            </div>
                        </div>
                    </div>
                    <div className="answer-question-nav">
                        <p className={activeTab == 'answers' ? 'active' : ''} onClick={() => handleTabClick('answers')}>Answers</p>
                        <p className={activeTab === 'questions' ? 'active' : ''} onClick={() => handleTabClick('questions')}>Questions</p>
                    </div> 
                    {activeTab === 'answers' && <AnswerList answers={answers}/>}
                    {activeTab === 'questions' && <TopicsQuestionsList topics={topics} setDeleteQ={setDeleteQ} setEditQ={setEditQ}/>}
                </div>
               
               <div className="relevant-spaces-container"></div>
            </div>
        </div>
    )
}

export default HomePage;