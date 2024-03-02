import { useSelector } from "react-redux";
import Editor from "./Editor";
import './CreateAnswer.css'

const CreateAnswerModal = ({question}) => {
    const author = useSelector(state => state.session.user)
    
    return (
        <div className="create-answer">
            <div className="author-container">
                <img className="autor-image" src={author?.profile_img} alt="profile image" />
                <div className="author">
                    <p>{author.first_name} {author.last_name}</p>
                    <p>{author.position}, {author.years_of_experience}yr of experience</p>
                </div>
                <p>{question.title}</p>
                <form >
                    <Editor />
                    <button type="submit">Post</button>
                </form>
            </div>
        </div>
    )
}

export default CreateAnswerModal;