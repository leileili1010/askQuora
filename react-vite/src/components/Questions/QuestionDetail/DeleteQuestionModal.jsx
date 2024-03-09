import { useModal } from "../../../context/Modal";
import { useDispatch, useSelector} from "react-redux";
import { thunkDeleteQuestion } from "../../../redux/question";
import { useNavigate, useParams, } from "react-router-dom";
import "./DeleteQuestionModal.css"

const DeleteQuestionModal = ({question, setDeleteQ}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const question_Id = question.id
    const { closeModal } = useModal()
    const {questionId} = useParams()
    const user = useSelector(state => state.session.user)


    const handleCancel = (e) => {
        e.preventDefault()
        closeModal()
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        await dispatch(thunkDeleteQuestion(question_Id))
        setDeleteQ(prev => prev + 1);
        if(questionId) navigate(`/user-profile/${user?.id}`)
        closeModal()
    }
    
    return (
        <div className="delete-confirm">
            <h3>Delete Question</h3>
            <p>Are you sure to delete this question?</p>
            <div className="delete-btns">
                <button id="question-cancel" onClick={handleCancel}>Cancel</button>
                <button id="question-submit" onClick={handleDelete}>Confirm</button>
            </div>
        </div>
    )
}

export default DeleteQuestionModal;