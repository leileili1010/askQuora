import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import { thunkGetAllAnswers, returnInitial } from "../../redux/answer";  
import { thunkGetUserSubscriptions } from "../../redux/session";
import AnswerListHome from "../Answers/AnswerList/AnswerListHome";
import NavigationHome from "../Navigation/NavigationHome";
import Navigation from "../Navigation/Navigation";
import CreateQuestionModal from '../Questions/CreateQuestion/CreateQuestion'
import OpenModalButton from '../OpenModalButton/OpenModalButton'
import TopicsQuestionsList from "../Topics/TopicsQuestion/TopicsQuestionsList"
import SpacesList from "../Spaces/SpacesList";
import RecommendTopics from "../Spaces/RecomendSpace";
import Skeleton from "../Skeleton/Skeleton";
import "./HomePage.css"

const HomePage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.session.user)
    const spaces = useSelector(state => state.session.userSubscriptions)
    const answersObj = useSelector(state => state.answers)
    const profile_img = user?.profile_img

    const [activeTab, setActiveTab] = useState('answers');
    const [deleteA, setDeleteA] = useState(0)
    const [editA, setEditA] = useState(0)
    const [sub, setSub] = useState({})
    const [searchInput, setSearchInput] = useState("")
    const [topicForUser, setTopicForUser] = useState("")
    const [subscriptionUpdate, setSubscriptionUpdate] = useState(0);
    const [loading, setLoading] = useState(true);
    let subAnswers

    useEffect(() => {
        if (!user) navigate("/");
    }, [user, navigate]);
    
    useEffect(() => {
        dispatch(thunkGetUserSubscriptions())
    }, [dispatch, subscriptionUpdate])
    
    // useEffect(() => {
    //     const loadInfo = async () =>{
    //         const data = await dispatch(thunkGetAllAnswers());
    //         setCurrentAnswers([...data])
    //     }
    //     loadInfo()
    //     return () => {
    //         dispatch(returnInitial());
    //     };
    // }, [dispatch, editA, deleteA])


    useEffect(() => {
        const loadInfo = async () => {
            setLoading(true); 
            try {
                const data = await dispatch(thunkGetAllAnswers());
                setCurrentAnswers([...data]);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); 
            }
        };
        loadInfo();

        return () => {
            dispatch(returnInitial());
        };
    }, [dispatch, editA, deleteA]);

    const answers = Object.values(answersObj).sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    
    if (Object.keys(sub).length > 0) {
        subAnswers = answers.filter(answer => answer.topic.name === sub.name ) 
    }
    const [currentAnswers, setCurrentAnswers] = useState([...answers]);
    
    
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    
    const handleSubscribe = async (subId) => {
        try {
            const res = await fetch("/api/subscriptions/new", {
                method: "POST", 
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ topic_id: subId })  
            });
    
            if (res.ok) {
                const data = await res.json();
                setSubscriptionUpdate(prev => prev + 1);
                setTopicForUser("");
                return data;
            } else {
                const errorData = await res.json();
                console.error('Error adding subscription:', errorData);
                return null;
            }
        } catch (error) {
            console.error('Network error:', error.message);
            return null;
        }
    };
    

    return (
        <div className="homepage">
            <div className="home-nav-bar">
                {
                    activeTab === "answers"?
                    (<NavigationHome answers={answers} searchInput={searchInput} setSearchInput={setSearchInput} currentAnswers={currentAnswers} setCurrentAnswers={setCurrentAnswers} setSub={setSub}/>):
                    <Navigation/>
                }
            </div>

            {loading && <Skeleton />}


            <div className="topics">
                {/* spaces and topics*/}
                <SpacesList setSub={setSub} spaces={spaces} setTopicForUser={setTopicForUser}/>

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
                                <div>
                                    <i className="fa-regular fa-pen-to-square"></i> 
                                    <span>Answer</span>
                                </div>
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
                                {topicForUser && <div className="new-sub">
                                    <button onClick={() => handleSubscribe(sub.id)}>Subscribe</button>
                                </div>}
                            </div>
                        } 
                        
                    </div>
                    <div className="answer-question-nav">
                        <p className={activeTab == 'answers' ? 'active' : ''} onClick={() => handleTabClick('answers')}>Answers</p>
                        <p className={activeTab === 'questions' ? 'active' : ''} onClick={() => handleTabClick('questions')}>Questions</p>
                    </div> 
                    {activeTab === 'answers' && <AnswerListHome answers={Object.keys(sub).length >0?subAnswers:currentAnswers} setDeleteA={setDeleteA} setEditA={setEditA}/>}
                    {activeTab === 'questions' && <TopicsQuestionsList sub={sub}   />}
                </div>
               
               <div className="relevant-spaces-container">
                    <RecommendTopics setSub={setSub} spaces={spaces} setTopicForUser={setTopicForUser} />     
               </div>
            </div>
        </div>
    )
}

export default HomePage;



