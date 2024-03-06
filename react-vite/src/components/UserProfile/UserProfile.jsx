import { useDispatch, useSelector } from "react-redux";
import Navigation from "../Navigation/Navigation";
import { useNavigate} from "react-router-dom";
import { useEffect, useState} from "react";
import UserAnswers from "../Answers/UserAnswers/UserAnswers";
import UserQuestions from "../Questions/UserQuestions/UserQuestions";
import "./UserProfile.css"

const UserProfile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.session.user)
    const [activeTab, setActiveTab] = useState('answers');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        if (!user) navigate("/");
      }, [user, navigate]);

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
                                <p className={activeTab == 'answers' ? 'active' : ''} onClick={() => handleTabClick('answers')}>Answers</p>
                                <p className={activeTab === 'uestions' ? 'active' : ''} onClick={() => handleTabClick('questions')}>Questions</p>
                            </div> 
                            {activeTab === 'answers' && <UserAnswers />}
                            {activeTab === 'questions' && <UserQuestions/>}

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