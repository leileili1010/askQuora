import { useDispatch, useSelector } from "react-redux";
import Navigation from "../Navigation/Navigation";
import { useNavigate} from "react-router-dom";
import { useEffect, useState} from "react";
import UserAnswers from "../Answers/UserAnswers/UserAnswers";
import UserQuestions from "../Questions/UserQuestions/UserQuestions";
import { thunkGetAuthorAnswers } from "../../redux/answer";
import { thunkGetUserQuestions } from "../../redux/question";
import "./UserProfile.css"

const UserProfile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.session.user)
    const [activeTab, setActiveTab] = useState('answers');
    const answersObj = useSelector(state => state.answers)
    const questionsObj = useSelector(state => state.questions)
    const answerTitle = Object.keys(answersObj).length>1? `${Object.keys(answersObj).length} Answers`: `${Object.keys(answersObj).length} Answer`
    const questionTitle = Object.keys(answersObj).length>1? `${Object.keys(questionsObj).length} Questions`: `${Object.keys(questionsObj).length} Questions`
 

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        if (!user) navigate("/");
      }, [user, navigate]);

      useEffect(() => {
        dispatch(thunkGetAuthorAnswers())
    }, [dispatch])

    useEffect(() => {
        dispatch(thunkGetUserQuestions())
     }, [dispatch])

    return (
        <div className="User-profile-page">
            <Navigation/>

            <div className="background">
                <div className="profile-container">
                    {/*part 1: user info  */}
                    <div className="profile">
                        <div className="user-info">
                            <img src={user.profile_img} alt="profile image" className="profile-img"/>
                            <div>
                                <h1>{user.first_name} {user.last_name}</h1>
                                <p>{user.position} · {user.years_of_experience}yr, {user.field}</p>
                            </div>
                        </div>

                        <div id="user-Q-A">
                            <div className="answer-question-nav">
                                <p className={activeTab == 'answers' ? 'active' : ''} onClick={() => handleTabClick('answers')}>{answerTitle}</p>
                                <p className={activeTab === 'questions' ? 'active' : ''} onClick={() => handleTabClick('questions')}>{questionTitle}</p>
                            </div> 
                            {activeTab === 'answers' && <UserAnswers answersObj={answersObj} answerTitle={answerTitle}/>}
                            {activeTab === 'questions' && <UserQuestions questionsObj={questionsObj} questionTitle={questionTitle}/>}

                        </div>
                    </div>

                    {/*part 2: credential and subscription */}
                    <div className="credentials">
                        <p>Credentials & Highlights</p>
                    </div>
                </div>
            </div>

           

        </div>

        
    )
}

export default UserProfile;