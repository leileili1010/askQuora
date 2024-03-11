import AnswerListItem from "../AnswerList/AnswerListItem";


const UserAnswers = ({userAnswers, answerTitle, setDeleteA, setEditA}) => {
    if (userAnswers.length == 0) return null
    const sortedAnswers = userAnswers.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    
    return (
        <div id="user-answers">
            <p className="Q-A-title">{answerTitle}</p>
            <div className="answer-list-component">
            {sortedAnswers.map(answer =>
               <AnswerListItem answer={answer} setDeleteA={setDeleteA} setEditA={setEditA} key={answer.id} />    
            )}
        </div>
        </div>
    )
}

export default UserAnswers;