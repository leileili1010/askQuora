import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal"
import { useNavigate } from "react-router-dom";
import Editor from "./Editor";
import './CreateAnswer.css'
import { useState } from "react";
import { thunkCreateAnswer } from "../../../redux/answer";

const CreateAnswerModal = ({question}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { closeModal } = useModal()
    const author = useSelector(state => state.session.user)
    const [detail, setDetail] = useState("")
    const [errors, setErrors] = useState({});
    const questionId = question.id
    
    const handleAnswerSubmit = async (e) => {
        e.preventDefault();
        setErrors({})
        const validationErrors = {};
        
        if (!detail) validationErrors.detail = "Answer is required";
        
        if (Object.values(validationErrors).length) {
            setErrors(validationErrors);
        } else {
            const topic_id = question.topic?.id 
            const answer = {
                detail,
                question_id: questionId,
                topic_id,
            }
            
            await dispatch(thunkCreateAnswer(answer))
            .then(() => {
                closeModal()
                navigate(`/questions/${questionId}`)
            })
            .catch(async (res) => {
                console.log("Inside errors catch =>", res);
              });
          }
        
    }

    const handleCancel = (e) => {
        e.preventDefault()
        closeModal()
      }

    return (
        <div className="create-answer"  >
            <div className="author-container">
                <img className="autor-image" src={author?.profile_img} alt="profile image" />
                <div className="author">
                    <p className="autho-name">{author.first_name} {author.last_name}</p>
                    <p>{author.position}, {author.years_of_experience}yr of experience</p>
                </div>
            </div>

            <p className="Q-title"> {question.title}</p>
            <form onSubmit={handleAnswerSubmit} >
                <Editor 
                onValueChange={(value) => setDetail(value)}
                value={detail}
                />
                {"detail" in errors && <p >{errors.tdetail}</p>}
                <div className="create-A">
                    <button id="question-cancel" onClick={handleCancel}>Cancel</button>
                    <button id="question-submit" type="submit">Post</button>
                </div>
            </form>
        </div>
    )
}

export default CreateAnswerModal;