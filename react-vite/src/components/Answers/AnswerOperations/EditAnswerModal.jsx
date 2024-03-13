import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal"
import Editor from "../CreateAnswer/Editor"
import { useState } from "react";
import { thunkEditAnswer } from "../../../redux/answer";

const EditAnswerModal = ({answer, setEditA}) => {    
    const dispatch = useDispatch();
    const { closeModal } = useModal()
    const user = useSelector(state => state.session.user)
    const author = answer.author
    const question = answer.question
    const answerId = answer.id
    const [detail, setDetail] = useState(answer.detail)
    const [errors, setErrors] = useState({});
    
    const parser = (anserDetail) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(anserDetail, 'text/html');
        const images = doc.querySelectorAll('img');
        let firstImageUrl = "";

        if (images.length > 0) {
            firstImageUrl = images[0].src; 
        }

        images.forEach(img => img.remove());
        const textContent = doc.body.innerHTML;
        const pureText = doc.body.textContent;
        return { 
            truncatedDetail: textContent,
            firstImageUrl,
            pureText
        };
    }


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
        const {pureText, truncatedDetail, firstImageUrl} = parser(detail)
        if (!detail || !pureText ) validationErrors.detail = "Answer is required";

        if (Object.values(validationErrors).length) {
            setErrors(validationErrors);
        } else {
            const formData = new FormData();
            formData.append("detail", detail);
            formData.append("detail_text", truncatedDetail);
            formData.append("detail_firstImgUrl", firstImageUrl);

            await dispatch(thunkEditAnswer(formData, answerId))
            .then(() => {
                closeModal()
                setEditA(prev => prev + 1)
            })
            .catch(async (res) => {
              console.log("Inside errors catch =>", res);
            });
        }

    }

    return (
         <div className="create-answer">
              <div className="author-container">
                    <img className="autor-image" src={author?.profile_img} alt="profile image" />
                    <div className="author">
                        <p className="autho-name">{author.first_name} {author.last_name}</p>
                        <p>{author.position}, {author.years_of_experience}yr of experience</p>
                    </div>
                </div>

                <p className="Q-title"> {question.title}</p>
                <form onSubmit={handleAnswerSubmit}>
                    <Editor 
                    onValueChange={(value) => setDetail(value)}
                    value={detail}
                    />
                    {"detail" in errors && <p className="input-errors">{errors.detail}</p>}
                    <div className="create-A">
                        <button id="question-cancel" onClick={handleCancel}>Cancel</button>
                        <button id="question-submit" type="submit">Post</button>
                    </div>
                </form>
            
        </div>
    )
}

export default EditAnswerModal;
