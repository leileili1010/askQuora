import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllAnswers } from "../../redux/answer";  
import { useEffect } from "react";
import AnswerList from "../Answers/AnswerList/AnswerList";
import Navigation from "../Navigation/Navigation";
import { useNavigate } from "react-router-dom";


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
            <h1>home page</h1>
            <div>
                <Navigation />
            </div>
            <AnswerList answers={answers}/>
        </div>
    )
}

export default HomePage;