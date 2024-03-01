import { Link
 } from "react-router-dom";
const AnswerListItem = ({answer}) => {
    return (
        <div>
            <div className="answer">
                <img src={answer.author.profile_img} alt="Profile image" />
                <div className="author">
                    <p>{answer.author.first_name} {answer.author.last_name}</p>
                    <p>{answer.author.position}, {answer.author.years_of_experience}yr of experience</p>
                </div>
                <Link to={`/questions/${answer.question.id}`}>{answer.question.title}</Link>
                <p>{answer.detail}</p>
            </div>
            <div>
                <i className="fa-regular fa-comment"></i>
            </div>
        </div>
    )
}

export default AnswerListItem;