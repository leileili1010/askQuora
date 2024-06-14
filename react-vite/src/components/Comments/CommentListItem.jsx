import { formatDate } from "../HelperFunctions/HelperFunctions";

const CommentListItem = ({ comment }) => {
    return (
        <div>
            <img src={comment.author?.profile_img} alt="" className="profile-image"/>
            <p>{comment.author?.first_name} {comment.author?.last_name}</p>
            <p>{formatDate(comment.updated_at)}</p>
            <p>{comment.comment}</p>
           
        </div>
    )
}

export default CommentListItem;