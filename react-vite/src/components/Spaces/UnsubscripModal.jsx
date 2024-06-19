import { useModal } from '../../context/Modal';
import { useSelector } from 'react-redux';

const UnsubscripModal = ({space, setDeleteS}) => {
    // const dispatch = useDispatch()
    // const navigate = useNavigate()
    const { closeModal } = useModal()
    const spaceId = space?.id
    // console.log("🚀 ~ UnsubscripModal ~ spaceId:", spaceId)
    const user = useSelector(state => state.session.user)

    if (user.id !== space.user.id) 
        return <h2>Unauthorized</h2> 


    const handleCancel = (e) => {
        e.preventDefault()
        closeModal()
    }

    const handleDelete = async (e) => {
        e.preventDefault()     
        const res = await fetch(`/api/subscriptions/${spaceId}/delete`, {
            method: 'DELETE',
        })
        if(res.ok) {
            setDeleteS(prev => prev + 1)
            closeModal()
        } else {
            const errs = await res.json();
            console.log("🚀 ~ handleDelete ~ errs:", errs) 
        }
        
    }
    
    return (
        <div className="delete-confirm">
            <h3>Unsubscrip Topic</h3>
            <p>Are you sure to Unsubscrib this topic?</p>
            <div className="delete-btns">
                <button id="question-cancel" onClick={handleCancel}>Cancel</button>
                <button id="question-submit" onClick={handleDelete}>Confirm</button>
            </div>
        </div>
    )
}

export default UnsubscripModal;