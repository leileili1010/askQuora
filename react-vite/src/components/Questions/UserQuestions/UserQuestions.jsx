import QuestionListItem from "../QuestionListItem/QuestionListItem";


const UserQuestions = ({questionsObj, questionTitle, setDeleteQ}) => {
    const questions = Object.values(questionsObj)

    if (questions.length == 0) return null

    return (
        <div>
            <p className="Q-A-title">{questionTitle}</p>
            <ul className="question-list">
                {questions.map((question) => (
                <QuestionListItem question={question} setDeleteQ={setDeleteQ} key={question.id} />
                ))}
            </ul>
        </div>
    )
}

export default UserQuestions;