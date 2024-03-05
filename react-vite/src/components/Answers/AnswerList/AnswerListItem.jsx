import { Link } from "react-router-dom";
import AnswerOperationButton from "./AnswerOpertionButton";
import { useSelector } from "react-redux/es/hooks/useSelector";
import './AnswerListItem.css'

 const AnswerListItem = ({answer}) => {
    const user = useSelector(state => state.session.user)
    const isOwner = user?.id == answer?.author.id

    return (
            <div className="answer">
                <div className="author-profile">
                    <img className="profile-image" src={answer.author.profile_img} alt="Profile image" />
                    <div className="author">
                        <p className="author-name">{answer.author.first_name} {answer.author.last_name}</p>
                        <p>{answer.author.position} · {answer.author.years_of_experience}yr, {answer.author.field}</p>
                    </div>
                </div>
                
                <Link to={`/questions/${answer.question.id}`}>{answer.question.title}</Link>
                {/* <p>{answer.detail}</p> */}
                <div className="rendered-content-class" dangerouslySetInnerHTML={{ __html: answer.detail }} />
                <div>
                    <i className="fa-regular fa-comment comment"></i>
                </div>
                {isOwner && (
                <div className = "operation-button">
                    <AnswerOperationButton answer={answer}/>
                </div>
                )}
            </div>
    )
}

export default AnswerListItem;


