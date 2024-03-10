import AnswerListItem from "../AnswerList/AnswerListItem";


const UserAnswers = ({answersObj, answerTitle, setDeleteA, setEditA}) => {
    if (answersObj.length == 0) return null
    const answers = Object.values(answersObj)
    const sortedAnswers = answers.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))

    if (!answers.length) return null;
    
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