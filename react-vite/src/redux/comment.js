const initialState = {};

const GET_COMMENTS = 'comments/GET_COMMENTS'
const CLEAR_COMMENTS = 'comments/CLEAR_COMMENTS'
const CREATE_COMMENT = 'comments/CREATE_COMMENT'
const DELETE_COMMENT = 'comments/DELETE_COMMENT'

// action creators
export const clearComments = () => ({
    type: CLEAR_COMMENTS
})

const getComments = (comments) => ({
    type: GET_COMMENTS,
    comments
})

const createComment = (comment) => ({
    type: CREATE_COMMENT,
    comment
})

const deleteComment = (commentId) => ({
    type: DELETE_COMMENT,
    commentId
})

// thunk functions
export const thunkGetComments = (answerId) => async dispatch => {
    const res = await fetch(`/api/answers/${answerId}/comments/get`)
  
    if (res.ok) {
      const comments = await res.json()
    //   console.log("🚀 ~ thunkGetComments ~ comments:", comments)
      dispatch(getComments(comments))
      return comments
    } else {
      const errs = await res.json()
      return errs;
    }
  }
  
export const thunkCreateComment = (answerId, commentData) => async dispatch => {
const res = await fetch(`/api/answers/${answerId}/comment/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(commentData)
})


if (res.ok) {
    const newComment = await res.json()
    dispatch(createComment(newComment))
    return newComment
} else {
    const errs = await res.json()
    return errs;
}
}

function commentReducer(state = initialState, action) {
    switch (action.type) {
      case GET_COMMENTS: {
        const newState = {}
        action.comments.forEach(comment => {
          newState[comment.id] = comment
        })
        return newState
      }
      case CLEAR_COMMENTS: {
        return initialState
      }
      case CREATE_COMMENT: {
        const newState = { ...state }
        newState[action.comment.id] = action.comment
        return newState
      }
      case DELETE_COMMENT: {
        const newState = { ...state }
        delete newState[action.commentId]
        return newState
      }
      default:
        return state
    }
  }

export default commentReducer;