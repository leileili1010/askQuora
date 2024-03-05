import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal"
import { useNavigate } from "react-router-dom";
import Editor from "../CreateAnswer/Editor"
import { useState } from "react";


const EditAnswerModal = ({answer}) => {
    console.log("🚀 ~ EditAnswerModal ~ answer:", answer)
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { closeModal } = useModal()
    const user = useSelector(state => state.session.user)
    const author = answer.author
    const question = answer.question
    const [detail, setDetail] = useState(answer.detail)
    const [errors, setErrors] = useState({});
    

    if (user.id !== author?.id) {
        return <h1>Not Authorized</h1>
    }

    const handleCancel = (e) => {
        e.preventDefault()
        closeModal()
    }

    const handleAnswerSubmit = async (e) => {
        e.preventDefault();
        setErrors({})
        const validationErrors = {};
        if (!detail) validationErrors.detail = "Answer is required";


    }

    return (
         <div className="create-answer">
            <div className="author-container">
                <img className="autor-image" src={author?.profile_img} alt="profile image" />
                <div className="author">
                    <p>{author.first_name} {author.last_name}</p>
                    <p>{author.position}, {author.years_of_experience}yr of experience</p>
                </div>
                <p>{question.title}</p>
                <form onSubmit={handleAnswerSubmit}>
                    <Editor 
                    onValueChange={(value) => setDetail(value)}
                    value={detail}
                    />
                    {"detail" in errors && <p >{errors.tdetail}</p>}
                    <button type="submit">Post</button>
                </form>
                    <button onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    )
}

export default EditAnswerModal;
