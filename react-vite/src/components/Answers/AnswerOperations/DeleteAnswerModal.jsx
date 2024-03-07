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
        // navigate(`/user-profile/${user.id}`)
    }

    return (
        <div>
            <h2>Delete Answer</h2>
            <p>Are you sure to delete this answer?</p>
            <button  onClick={handleDelete}>Confirm</button>
            <button onClick={handleCancel}>Cancel</button>
        </div>
    )
}

export default DeleteAnswerModal