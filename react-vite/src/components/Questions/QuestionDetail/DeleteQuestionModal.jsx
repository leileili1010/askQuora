import { useModal } from "../../../context/Modal";
import { useDispatch, useSelector} from "react-redux";
import { thunkDeleteQuestion } from "../../../redux/question";
import { useNavigate, useParams, } from "react-router-dom";

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
        <div>
            <h2>Delete Question</h2>
            <p>Are you sure to delete this question?</p>
            <button  onClick={handleDelete}>Confirm</button>
            <button onClick={handleCancel}>Cancel</button>
        </div>
    )
}

export default DeleteQuestionModal;