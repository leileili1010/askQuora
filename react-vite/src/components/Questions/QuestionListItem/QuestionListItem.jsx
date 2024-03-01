const QuestionListItem = ({question}) => {
    return (
        <li className="question-container">
            <div className="author-container">
                <img src={question.owner.profile_img} alt="profile image" />
                <div>
                    <p>{question.owner.first_name} {question.owner.last_name}</p>
                    <p>{question.owner.position}, specialize in {question.owner.field}, {question.owner.years_of_experience
}yr-experience</p>
                </div>
            </div>
            <div className="question">
                <p>{question.title}</p>
                <p>{question.description}</p>
                <i class="fa-regular fa-comment"></i>
            </div>
        </li>
    )
}

export default QuestionListItem;