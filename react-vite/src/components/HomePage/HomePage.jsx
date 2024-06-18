import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AnswerListHome from "../Answers/AnswerList/AnswerListHome";
import AnswerListTopic from "../Answers/AnswerList/AnswerListTopic";
import Navigation from "../Navigation/Navigation";
import CreateQuestionModal from '../Questions/CreateQuestion/CreateQuestion'
import OpenModalButton from '../OpenModalButton/OpenModalButton'
import TopicsQuestionsList from "../Topics/TopicsQuestion/TopicsQuestionsList"
import SpacesList from "../Spaces/SpacesList";
// import RecommendTopics from "../Spaces/RecomendSpace";

import "./HomePage.css"

const HomePage = () => {
    const navigate = useNavigate()
    const user = useSelector(state => state.session.user)
    const profile_img = user?.profile_img
    const [activeTab, setActiveTab] = useState('answers');
    const [sub, setSub] = useState({})
    const topicName = useParams().topicName;    
    const [initialLoad, setInitialLoad] = useState(true);
    // console.log("🚀 ~ HomePage ~ topicName:", topicName)
    // const [loading, setLoading] = useState(true);
    let subAnswers

    useEffect(() => {
        if (!user) navigate("/");
    }, [user, navigate]);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        setInitialLoad(true);
    }, [topicName]);

    return (
        <div className="homepage">
            <div className="home-nav-bar">
                {
                    <Navigation/>
                }
            </div>
            
            <div className="topics">
                {/* spaces and topics*/}
                <SpacesList setSub={setSub}/>

                 {/* spaces and topics*/}
                <div className="topic-answers">
                    <div className="ask-answer">
                        {!Object.keys(sub).length &&
                                <>
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
                                {/* <div>
                                    <i className="fa-regular fa-pen-to-square"></i> 
                                    <span>Answer</span>
                                </div> */}
                            </div>
                            </>
                        }
                    
                         
                         {Object.keys(sub).length > 0 && 

                            <div className="add-new-sub">
                                <div className="render-space">
                                    <img src={sub.cover_img} />
                                    <div>
                                        <h3>{sub.name}</h3>
                                        <p>{sub.description}</p>
                                    </div>
                                </div>
                            </div>
                        } 
                        
                    </div>
                    <div className="answer-question-nav">
                        <p className={activeTab == 'answers' ? 'active' : ''} onClick={() => handleTabClick('answers')}>Answers</p>
                        <p className={activeTab === 'questions' ? 'active' : ''} onClick={() => handleTabClick('questions')}>Questions</p>
                    </div> 
                    {activeTab === 'answers' &&  !topicName && <AnswerListHome initialLoad={initialLoad} setInitialLoad={setInitialLoad}/>}
                    {activeTab === 'answers' && topicName && <AnswerListTopic topicName={topicName} />}
                    {activeTab === 'questions' && <TopicsQuestionsList sub={sub}   />}
                </div>
               
               {/* <div className="relevant-spaces-container">
                    <RecommendTopics setSub={setSub} spaces={spaces} setTopicForUser={setTopicForUser} />     
               </div> */}
            </div>
        </div>
    )
}

export default HomePage;



