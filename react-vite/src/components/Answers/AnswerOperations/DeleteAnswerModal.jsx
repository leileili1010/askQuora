import { useModal } from "../../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { thunkDeleteAnswer } from "../../../redux/answer";


const DeleteAnswerModal = ({answer, setDeleteA}) => {
    const dispatch = useDispatch()
    const answerId = answer.id
    const { closeModal } = useModal()
    const user = useSelector(state => state.session.user)

    if (user.id !== answer.author.id) {
        return <h1>Not Authorized!</h1>
    }

    const handleCancel = (e) => {
        e.preventDefault()
        closeModal()
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        await dispatch(thunkDeleteAnswer(answerId))
        setDeleteA(prev => prev + 1)
        closeModal()
    }

    return (
        <div className="delete-confirm">
            <h3>Delete Answer</h3>
            <p>Are you sure to delete this answer?</p>
            <div className="delete-btns">
                <button id="question-cancel" onClick={handleCancel}>Cancel</button>
                <button id="question-submit" onClick={handleDelete}>Confirm</button>
            </div>
        </div>
    )
}

export default DeleteAnswerModal