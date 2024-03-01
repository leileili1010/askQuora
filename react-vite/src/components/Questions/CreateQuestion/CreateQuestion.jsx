import { useModal } from "../../../context/Modal"
import { useState } from "react";

const CreateQuestionModal = () => {
    const { closeModal } = useModal()
    const [title, setTitle] = useState("")
    const [errors, setErrors] = useState({});
    
    const handleQuestionSubmit = () => {
        e.preventDefault();
        setErrors({});
        const validationErrors = {};

        if (!title) validationErrors.title = "Question is required";

        if (Object.values(validationErrors).length) {
            setErrors(validationErrors);
          } else {
            
          }
        
        closeModal()
    }

    const handleCancel = (e) => {
        e.preventDefault()
        closeModal()
      }

    return (
        <div>
            <form onSubmit={handleQuestionSubmit}>
                <label htmlFor="title">
                    <textarea
                        name = 'title' 
                        type="text" 
                        value = {title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Start your question with "what", "How", "Why", etc.'
                    />
                </label>
                <div className="question-errors">
                    {"title" in errors && <p >{errors.title}</p>}
                </div>
                 <button type="submit">
                    Add Question
                </button>
                <button onClick={handleCancel}>
                    Cancel
                </button>
            </form>
        </div>
    );
};


export default CreateQuestionModal;