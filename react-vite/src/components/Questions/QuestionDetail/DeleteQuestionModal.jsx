import { useModal } from "../../../context/Modal";
import { useDispatch} from "react-redux";
import { thunkDeleteQuestion } from "../../../redux/question";
import { useNavigate, } from "react-router-dom";

const DeleteQuestionModal = ({question, setDeleteQ}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const questionId = question.id
    const { closeModal } = useModal()
    // const user = useSelector(state => state.session.user)

    const handleCancel = (e) => {
        e.preventDefault()
        closeModal()
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        await dispatch(thunkDeleteQuestion(questionId))
        setDeleteQ(prev => prev + 1);
        closeModal()
    }
    
    return (
        <div>
            <h2>Delete Question</h2>
            <p>Are you sure to delete this question?</p>
            <button  onClick={handleDelete}>Confirm</button>
            <button onClick={handleCancel}>Cancel</button>
        </div>
    )
}

export default DeleteQuestionModal;