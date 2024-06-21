import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal"
import { useState } from "react";
// import { thunkGetTopics, returnTopicInitial} from "../../../redux/topic";
import {thunkCreateQuestion} from "../../../redux/question";
import { useNavigate } from "react-router-dom";
import "./CreateQuestion.css"


const CreateQuestionModal = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { closeModal } = useModal()
    const [title, setTitle] = useState("")
    const [errors, setErrors] = useState({});
    const [AIEdit, setAIEdit] = useState("");
    const user = useSelector((state) => state.session.user);
 

    if (!user) {
        return <h2>You must be logged in to add a question</h2>;
    } // need to update later on

    
    const handleQuestionSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        const validationErrors = {};

        if (!title) validationErrors.title = "Question is required";

        if (Object.values(validationErrors).length) {
            setErrors(validationErrors);
          } else {
            const formData = new FormData();
            formData.append("title", title);
            
            await dispatch(thunkCreateQuestion(formData))
            .then((createdQuestion) => {
                closeModal()
                navigate(`/questions/${createdQuestion.id}`)
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

    const handleAIEdit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/openai/edit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userContent: title })
            });

            const data = await response.json();
            if (response.ok) {
                setAIEdit(data.editedContent);
            } else {
                console.error("AI Edit Error:", data.error);
            }
        } catch (error) {
            console.error("Error with AI Edit:", error);
        }
    }

    return (
        <div id="create-q-modal">
            <form className="create-q-form" onSubmit={handleQuestionSubmit}>
                <div className="cancel-icon" onClick={handleCancel}> <i className="fa-regular fa-circle-xmark"></i></div>
              
                <div className="user-add-q">
                    <div>
                        <img className="prfile-img" src={user?.profile_img} />
                    </div>
                    <div>
                        <i className="fa-solid fa-play"></i>
                    </div>
                    <div className="add-question">
                        <p>Add Question</p>
                    </div>
                </div>
                
                <label htmlFor="title-textarea">
                    <textarea
                        name = 'title' 
                        id="title-textarea"
                        type="text" 
                        cols="60" 
                        rows="10"
                        value = {title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Start your question with "what", "How", "Why", etc.'
                    />
                </label>
                
                <div className = "AI-edit">
                    <p>{AIEdit}</p>  
                    {AIEdit && <div className="AI-Edit-Icon" onClick={() => {setTitle(AIEdit);setAIEdit("")}}>{<i className="fa-regular fa-square-check AI-edit-accept"  ></i>}</div>}
                </div>

                <div className="question-errors">
                    {"title" in errors && <p >{errors.title}</p>}
                </div>
                <div className="create-q-button-container">
                    <button id="question-cancel" onClick={handleCancel}>
                        Cancel
                    </button>
                    <button id="question-submit" type="submit" onClick={handleAIEdit}>
                       AI Edit
                    </button>
                    <button id="question-submit" type="submit">
                        Add Question
                    </button>
                </div>      
               
            </form>
        </div>
    );
};


export default CreateQuestionModal;