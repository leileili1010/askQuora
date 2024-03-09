import { useState } from "react";
import { useModal } from "../../../context/Modal";
import { useDispatch, useSelector} from "react-redux";
import { thunkEditQuestion } from "../../../redux/question";

const EditQuestionModal = ({question, setEditQ}) => {
    const dispatch = useDispatch()
    const questionId = question.id
    const { closeModal } = useModal()
    const [title, setTitle] = useState(question?.title)
    const [errors, setErrors] = useState({});
    const user = useSelector(state => state.session.user)

    const handleCancel = (e) => {
        e.preventDefault()
        closeModal()
    }

    const handleEdit = async (e) => {
        e.preventDefault()
        setErrors({});
        const validationErrors = {};

        if (!title) validationErrors.title = "Question is required";

        if (Object.values(validationErrors).length) {
            setErrors(validationErrors);
          } else {
            const formData = new FormData();
            formData.append("title", title);

            await dispatch(thunkEditQuestion(formData, questionId))
            .then(() => {
                setEditQ(prev => prev + 1)
                closeModal()
            })
            .catch(async (res) => {
              console.log("Inside errors catch =>", res);
            });
          }
    }
    
    return (
        <div id="create-q-modal">
            <form className="create-q-form" onSubmit={handleEdit}>
            <div className="cancel-icon" onClick={handleCancel}> <i className="fa-regular fa-circle-xmark"></i></div>
              
              <div className="user-add-q">
                  <div>
                      <img className="prfile-img" src={user?.profile_img} />
                  </div>
                  <div>
                      <i className="fa-solid fa-play"></i>
                  </div>
                  <div className="Edit-question">
                      <p>Edit Question</p>
                  </div>
              </div>
                <label htmlFor="title">
                    <textarea 
                        name="title" 
                        cols="60" 
                        rows="10"
                        type="text" 
                        value = {title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="What is your question?"
                    />
                </label>
                {"title" in errors && <p >{errors.title}</p>}
            <div className="create-q-button-container">
                <button id="question-cancel" onClick={handleCancel}>Cancel</button>
                <button  id="question-submit" type="submit">Save</button>
            </div>
            </form>
        </div>
    )
}

export default EditQuestionModal;