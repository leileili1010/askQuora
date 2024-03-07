import AnswerList from "../AnswerList/AnswerList";


const UserAnswers = ({answersObj, answerTitle, setDeleteA, setEditA}) => {
    if (answersObj.length == 0) return null
    const answers = Object.values(answersObj)
    
    return (
        <div id="user-answers">
            <p className="Q-A-title">{answerTitle}</p>
            <AnswerList answers = {answers} setDeleteA={setDeleteA} setEditA={setEditA}/>
        </div>
    )
}

export default UserAnswers