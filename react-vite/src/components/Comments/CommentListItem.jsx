import { formatDate } from "../HelperFunctions/HelperFunctions";
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkCreateComment } from '../../redux/comment';
import CommentOperationButton from "./CommentOperationButton";
import TextBox from "./TextBox";
import './CommentListItem.css';

const CommentListItem = ({ comment, answer, setAddComment, setDeleteComment}) => {
    const dispatch = useDispatch();
    const [like, setLike] = useState(false);
    const [ifReply, setIfReply] = useState(false);
    const [text, setText] = useState("");
    const user = useSelector(state => state.session.user);
    const ifAuthor = user?.id === comment.author.id;
    const textBoxRef = useRef(null);
    const hasReplies = comment?.replies?.length > 0

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (textBoxRef.current && !textBoxRef.current.contains(event.target)) {
                setIfReply(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (text.trim() === "") {
            return;
        }

        const newComment = {
            reply: text,
            parentId: comment.id
        };

        const res = await dispatch(thunkCreateComment(answer.id, newComment));
        if (res) {
            setText("");
            setIfReply(false);
            setAddComment(prev => prev + 1);
        }
    };

    return (
        <div>
            <div className="comment-item">

                <div className="comment-author">
                    <img src={comment.author?.profile_img} alt="" className="profile-image" />
                </div>

                <div className="one-comment">
                    <p className="author-name">{comment.author?.first_name} {comment.author?.last_name} <span className="comment-date">. {formatDate(comment.updated_at)}</span></p>
                    <p className="comment-text">{comment.comment}</p>

                    <div className="comment-actions">
                        <div className="reply-comment-container">
                            {ifReply && (
                                <div className="user-comment-input" id="reply-box" ref={textBoxRef}>
                                    <TextBox text={text} setText={setText} />
                                    <button className="reply-button" onClick={handleSubmitComment}>Reply</button>
                                </div>
                            )}
                            {!like && !ifReply && (
                                <i className="fa-regular fa-heart like" onClick={() => setLike(true)}></i>
                            )}
                            {like && !ifReply && (
                                <i className="fa-solid fa-heart like" onClick={() => setLike(false)}></i>
                            )}
                            {!ifReply && (
                                <button className="reply-button" onClick={() => setIfReply(true)}>Reply</button>
                            )}
                        </div>

                        {!ifReply && ifAuthor && <CommentOperationButton  comment={ comment}  answer={answer} setDeleteComment={setDeleteComment} ifEdit />}
                    </div>
                </div>

            </div>
            <div className="comment-replies">
                {hasReplies && (
                    <div className="replies-container">
                        {comment.replies.map(reply => (
                            <CommentListItem key={reply?.id} comment={reply} answer={answer} setAddComment={setAddComment} setDeleteComment={setDeleteComment}  />
                        ))}
                    </div>
                )}
            </div>
        </div>

    );
};

export default CommentListItem;
