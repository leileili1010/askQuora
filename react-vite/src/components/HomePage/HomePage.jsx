import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllAnswers } from "../../redux/answer";  
import { useEffect } from "react";
import AnswerList from "../Answers/AnswerList/AnswerList";


const HomePage = () => {
    const dispatch = useDispatch()
    const answersObj = useSelector(state => state.answers)

    useEffect(() => {
        dispatch(thunkGetAllAnswers())
    }, [dispatch])

    if (answersObj.length == 0) return null
    const answers = Object.values(answersObj)
    
    return (
        <div>
            <h1>home page</h1>
            <AnswerList answers={answers}/>
        </div>
    )
}

export default HomePage;