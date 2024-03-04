import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllAnswers } from "../../redux/answer";  
import { useEffect } from "react";
import AnswerList from "../Answers/AnswerList/AnswerList";
import Navigation from "../Navigation/Navigation";
import { useNavigate } from "react-router-dom";
import "./HomePage.css"

const HomePage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const answersObj = useSelector(state => state.answers)
    const user = useSelector(state => state.session.user)
    
    useEffect(() => {
        if (!user) navigate("/");
      }, [user, navigate]);

    useEffect(() => {
        dispatch(thunkGetAllAnswers())
    }, [dispatch])

    if (answersObj.length == 0) return null
    const answers = Object.values(answersObj)
    
    return (
        <div>
            <div>
                <Navigation />
            </div>
            <div className="topics">
                <div className="spaces-container">

                </div>
                <div className="topic-answers">
                    <div className="ask-answer">
                        
                    </div>
                    <AnswerList answers={answers}/>
                </div>
                <div className="relevant-spaces-container">

                </div>
            </div>
        </div>
    )
}

export default HomePage;