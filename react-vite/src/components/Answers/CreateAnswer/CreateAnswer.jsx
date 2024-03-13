import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal"
import { useNavigate } from "react-router-dom";
import Editor from "./Editor";
import './CreateAnswer.css'
import { useState } from "react";
import { thunkCreateAnswer } from "../../../redux/answer";
import { thunkSetUserAnswers } from "../../../redux/session";

const CreateAnswerModal = ({question}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { closeModal } = useModal()
    const author = useSelector(state => state.session.user)
    const [detail, setDetail] = useState("")
    const [errors, setErrors] = useState({});
    const questionId = question.id

    const parser = (anserDetail) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(anserDetail, 'text/html');
        const images = doc.querySelectorAll('img');
        let firstImageUrl = null;

        if (images.length > 0) {
            firstImageUrl = images[0].src; 
        }

        images.forEach(img => img.remove());
        const textContent = doc.body.innerHTML;
        // const textContent = doc.body.textContent

        return { 
            truncatedDetail: textContent,
            firstImageUrl,
        };
    }
    
    const handleAnswerSubmit = async (e) => {
        e.preventDefault();
        setErrors({})
        const validationErrors = {};
        
        if (!detail) validationErrors.detail = "Answer is required";
    

        if (Object.values(validationErrors).length) {
            setErrors(validationErrors);
        } else {
            const topic_id = question.topic?.id
            const { truncatedDetail, firstImageUrl } = parser(detail)
            console.log("🚀 ~ handleAnswerSubmit ~ firstImageUrl :", firstImageUrl )
            console.log("🚀 ~ handleAnswerSubmit ~ truncatedDetail:", truncatedDetail)
            const answer = {
                detail,
                detail_text: truncatedDetail,
                detail_firstImgUrl: firstImageUrl,
                question_id: questionId,
                topic_id,
            }

            await dispatch(thunkCreateAnswer(answer))
                .then(() => {
                    closeModal()
                    dispatch(thunkSetUserAnswers())
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