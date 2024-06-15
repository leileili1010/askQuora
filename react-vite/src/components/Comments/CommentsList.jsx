import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearComments, thunkGetComments } from "../../redux/comment";
import CommentListItem from "./CommentListItem";
import { createSelector } from "reselect";
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import './CommentsList.css';

const selectComments = state => state.comments;

const selectCommentsArray = createSelector(
  [selectComments],
  comments => Object.values(comments)
);

const CommentList = ({ answer }) => {
  const dispatch = useDispatch();
  const answerId = answer.id;
  const comments = useSelector(selectCommentsArray);
  const user = useSelector(state => state.session.user);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };

    if (showEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmojiPicker]);

  useEffect(() => {
    dispatch(thunkGetComments(answerId));

    return () => dispatch(clearComments());
  }, [dispatch, answerId]);

  if (!comments.length) return null;

  return (
    <div className="comment">
      <div className="user-comment-input">
        <img src={user.profile_img} alt="" />
        <div className="text-box">
          <textarea placeholder="Add a comment..."></textarea>
          <i className="fa-solid fa-face-laugh emoji" onClick={() => setShowEmojiPicker(!showEmojiPicker)}></i>
        </div>
        
        {showEmojiPicker && <div className="emoji-container" ref={emojiPickerRef}>
            <Picker theme="dark" emojiSize={20} emojiButtonSize={28} data={data} onEmojiSelect={console.log} />   
        </div>}
        <button>Add comment</button>
      </div>
      {comments.map(comment => (
        <CommentListItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
