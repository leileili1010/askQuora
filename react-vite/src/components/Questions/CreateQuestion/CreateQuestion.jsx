import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal"
import { useEffect, useState } from "react";
import { thunkGetTopics, returnInitial} from "../../../redux/topic";
import {thunkCreateQuestion} from "../../../redux/question";


const CreateQuestionModal = () => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const [title, setTitle] = useState("")
    const [errors, setErrors] = useState({});
    const topicsObj = useSelector(state => state.topics)
    const topics = Object.values(topicsObj);
    const user = useSelector((state) => state.session.user);

    const shuffleAndSelect = (arr) => {
        const shuffled = arr.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 6); 
    };

    useEffect(() => {
        dispatch(thunkGetTopics())
        return () => {
            dispatch(returnInitial());
        };
    }, [dispatch])

    if (!user) {
        return <h2>You must be logged in to add a question</h2>;
    } // need to update later on

    if (topicsObj.length == 0) return null;

    const selectedTopics = shuffleAndSelect(topics);
    
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
            .then(() => {
                closeModal()
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