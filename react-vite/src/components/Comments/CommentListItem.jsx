import { formatDate } from "../HelperFunctions/HelperFunctions";
import { useState } from 'react';
import './CommentListItem.css';

const CommentListItem = ({ comment }) => {
    const [like, setLike] = useState(false);
    return (
        <div className="comment-item">
            <div className="comment-author">
                <img src={comment.author?.profile_img} alt="" className="profile-image" />
            </div>

            <div>
                <p className="author-name">{comment.author?.first_name} {comment.author?.last_name} <span className="comment-date">. {formatDate(comment.updated_at)}</span></p>
                <p className="comment-text">{comment.comment}</p>

                <div className="comment-actions">
                    <div>
                    {!like && <i className="fa-regular fa-heart like" onClick={() => setLike(true)}></i>}
                    { like && <i className="fa-solid fa-heart like" onClick={() => setLike(false)}></i>}
                        <button className="reply-button">Reply</button>
                    </div>

                    <div className="three-dots">
                        <i className="fa-solid fa-ellipsis"></i>
                    </div>
                </div>
            </div>
        </div>
    );
  };

export default CommentListItem;