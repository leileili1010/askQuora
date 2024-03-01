import { useState } from "react";
import { useModal } from "../../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { thunkEditQuestion } from "../../../redux/question";

const EditQuestionModal = ({question}) => {
    console.log("🚀 ~ EditQuestionModal ~ question:", question)
    const dispatch = useDispatch()
    const questionId = question.id
    const { closeModal } = useModal()
    const [title, setTitle] = useState(question?.title)
    const [errors, setErrors] = useState({});
    // const user = useSelector(state => state.session.user)

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
                closeModal()
            })
            .catch(async (res) => {
              console.log("Inside errors catch =>", res);
            });
          }
    }
    
    return (
        <div>
            <h2>Edit Question</h2>
            <form onSubmit={handleEdit}>
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
            <button onClick={handleCancel}>Cancel</button>
            <button  type="submit">Save</button>
            </form>
        </div>
    )
}

export default EditQuestionModal;