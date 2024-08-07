import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { clearComments, thunkGetComments, thunkCreateComment } from "../../redux/comment";
import CommentListItem from "./CommentListItem";
import TextBox from "./TextBox";
import './CommentsList.css';



const CommentList = ({ answer}) => {
  const dispatch = useDispatch();
  const answerId = answer.id;
  const selectComments = state => state.comments;
  const user = useSelector(state => state.session.user);
  const [text, setText] = useState("");
  const [addComment, setAddComment] = useState(0);
  const [deleteComment, setDeleteComment] = useState(0);
  const selectCommentsArray = createSelector(
    [selectComments],
    comments => Object.values(comments).sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
  );
  const comments = useSelector(selectCommentsArray);

  useEffect(() => {
    dispatch(thunkGetComments(answerId));
    return () => dispatch(clearComments());
  }, [dispatch, answerId, addComment, deleteComment]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (text.trim() === "") {
      return;
    }

    const newComment = {
      comment: text
    };

    const res = await dispatch(thunkCreateComment(answerId, newComment));
    if (res) {
      setText("");
      setAddComment(prev => prev + 1);
    }
  };

  return (
    <div className="comment">
      <div className="user-comment-input">
        <img src={user.profile_img} alt="" />
        <TextBox text={text} setText={setText} />
        <button className={text.trim() === "" ? "disabled" : ""} onClick={handleSubmitComment}>
          Add comment
        </button>
      </div>
      {comments.length > 0 && comments.map(comment => (
        <CommentListItem key={comment.id} comment={comment} answer={answer} setAddComment={setAddComment} setDeleteComment={setDeleteComment} />
      ))}
    </div>
    
    
  );
};

export default CommentList;
