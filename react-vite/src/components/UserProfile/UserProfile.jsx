import { useDispatch, useSelector } from "react-redux";
import Navigation from "../Navigation/Navigation";
import { useNavigate} from "react-router-dom";
import { useEffect, useState} from "react";
import UserAnswers from "../Answers/UserAnswers/UserAnswers";
import UserQuestions from "../Questions/UserQuestions/UserQuestions";
import { thunkSetUserAnswers } from "../../redux/session";
import { thunkGetUserQuestions } from "../../redux/question";
import UserSpacesList from "../Spaces/UserSpaces";
import "./UserProfile.css"

const UserProfile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.session.user)
    const [activeTab, setActiveTab] = useState('answers');
    const questionsObj = useSelector(state => state.questions)
    const questionTitle = Object.keys(questionsObj).length>1? `${Object.keys(questionsObj).length} Questions`: `${Object.keys(questionsObj).length} Question`
    
    const dateString = user?.created_at;
    const date = new Date(dateString);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const formattedDate = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    const [deleteQ, setDeleteQ] = useState(0)
    const [editQ, setEditQ] = useState(0)
    const [deleteA, setDeleteA] = useState(0)
    const [editA, setEditA] = useState(0)
    
    const userAnswers = useSelector(state => state.session.userAnswers) || [];
    const answerTitle =  userAnswers.length>1? `${ userAnswers.length} Answers`: `${ userAnswers.length} Answer`


    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        if (!user) navigate("/");
      }, [user, navigate]);

      useEffect(() => {
        dispatch(thunkSetUserAnswers())
    }, [dispatch, deleteA, editA])


    useEffect(() => {
        dispatch(thunkGetUserQuestions())
     }, [dispatch, deleteQ, editQ])

    return (
        <div className="User-profile-page">
            <Navigation />

            <div className={activeTab == 'answers' ? 'background-answer' : 'background-Qs'}>
                <div className="profile-container">
                    {/*part 1: user info  */}
                    <div className="profile">
                        <div className="user-info">
                            <img src={user?.profile_img} alt="profile image" className="profile-img" />
                            <div>
                                <h1>{user?.first_name} {user?.last_name}</h1>
                                <p>{user?.position} · {user?.years_of_experience}yr, {user?.field}</p>
                            </div>
                        </div>

                        <div id="user-Q-A">
                            <div className="answer-question-nav">
                                <p className={activeTab == 'answers' ? 'active' : ''} onClick={() => handleTabClick('answers')}>{answerTitle}</p>
                                <p className={activeTab === 'questions' ? 'active' : ''} onClick={() => handleTabClick('questions')}>{questionTitle}</p>
                            </div>
                            {activeTab === 'answers' && <UserAnswers userAnswers={userAnswers} answerTitle={answerTitle} setDeleteA={setDeleteA} setEditA={setEditA} />}
                            {activeTab === 'questions' && <UserQuestions questionsObj={questionsObj} setDeleteQ={setDeleteQ} setEditQ={setEditQ} questionTitle={questionTitle} editA={editA}deleteA={deleteA}/>}

                        </div>
                    </div>

                    {/*part 2: credential and subscription */}
                    <div className="credentials-highlights">
                        <div className="credentials">
                            <p className="credentials-title" >Credentials & Highlights</p>

                            <div className="credentials-details">
                                <div>
                                    <i className="fa-solid fa-briefcase"></i>
                                </div>
                                <p>{user?.position}</p>
                            </div>

                            <div className="credentials-details">
                                <div>
                                    <i className="fa-regular fa-clock"></i>
                                </div>
                                <p>{user?.years_of_experience}-yr of experience</p>
                            </div>

                            <div className="credentials-details">
                                <div>
                                    <i className="fa-solid fa-laptop"></i>
                                </div>
                                <p>{user?.field}</p>
                            </div>

                            <div className="credentials-details">
                                <div>
                                    <i className="fa-regular fa-calendar"></i>
                                </div>
                                <p>Joined {formattedDate}</p>
                            </div>
                        </div>

                        <div className="user-subscriptions">
                            <p className="credentials-title" id="user-subscriptions-title" >Manage Your Subscriptions</p>
                            <UserSpacesList />
                        </div>

                        {/* <div className="user-subscriptions knows">
                            <p className="credentials-title">Knows About</p>
                            <div className="subscriptions">
                                {
                                    Object.values(answersObj).map(answer => 
                                        <div key={answer.id} className="subscription" id="knows">
                                            <img src={answer.topic.cover_img} alt="" />
                                            <p>{answer.topic.name}</p>
                                        </div>
                                    )
                                }
                            </div>
                        </div> */}
                    </div>

                </div>
            </div>



        </div>


    )
}

export default UserProfile;