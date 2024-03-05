import { useDispatch, useSelector } from "react-redux";
import { thunkGetAuthorAnswers } from "../../../redux/answer";
import { useEffect } from "react";
import AnswerList from "../AnswerList/AnswerList";


const UserAnswers = () => {
    const dispatch = useDispatch()
    const answersObj = useSelector(state => state.answers)

    useEffect(() => {
        dispatch(thunkGetAuthorAnswers())
    }, [dispatch])

    if (answersObj.length == 0) return null
    const answers = Object.values(answersObj)
    
    return (
        <div>
            <h1>Manage Your Anssers</h1>
            <AnswerList answers = {answers}/>
        </div>
    )
}

export default UserAnswers