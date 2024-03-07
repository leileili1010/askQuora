// action type
const RETURN_INITIAL = "answers/RETURN_INITIAL";
const GET_TOPIC_ANSWERS = "answers/GET_TOPIC_ANSWERS"
const GET_QUESTION_ANSWERS = "answers/GET_QUESTION_ANSWERS"
const GET_AUTHOR_ANSWERS = "answers/GET_AUTHOR_ANSWERS"
const GET_ALL_ANSWERS = "answers/GET_ALL_ANSWERS"
const CREATE_ANSWER = "answers/CREATE_ANSWER"
const DELETE_ANSWER = "answers/DELETE_ANSWER"

// action creator
export const returnInitial = () => ({
    type: RETURN_INITIAL
});

const getTopicAnswers = (answers) => ({
    type: GET_TOPIC_ANSWERS,
    answers
})

const getQuestionAnswers = (answers) => ({
    type: GET_QUESTION_ANSWERS,
    answers
})

const getAuthorAnswers = (answers) => ({
    type: GET_AUTHOR_ANSWERS,
    answers
})

const getAllAnswers = (answers) => ({
    type: GET_ALL_ANSWERS,
    answers
})

const createAnswer = (answer) => ({
    type: CREATE_ANSWER,
    answer
})

const deleteAnswer = (answerId) => ({
    type: DELETE_ANSWER,
    answerId
})


// thunk
// get topic answers
export const thunkGetTopicAnswers = (topicId) => async dispatch => {
    const res = await fetch(`/api/topics/${topicId}/answers`)
    if (res.ok) {
        const answers = await res.json();
        dispatch(getTopicAnswers(answers));
    } else {
        const errs = await res.json()
        return errs;
    }
}

// get question answers
export const thunkGetQuestionAnswers = (questionId) => async dispatch => {
    const res = await fetch(`/api/questions/${questionId}/answers`)
    if (res.ok) {
        const answers = await res.json();
        dispatch(getQuestionAnswers(answers));
    } else {
        const errs = await res.json()
        return errs;
    }
}

// get author answers
export const thunkGetAuthorAnswers = () => async dispatch => {
    const res = await fetch(`/api/questions/currrent/answers`)
    if (res.ok) {
        const answers = await res.json();
        dispatch(getAuthorAnswers(answers));
    } else {
        const errs = await res.json()
        return errs;
    }
}

// get all answers
export const thunkGetAllAnswers = () => async dispatch => {
    const res = await fetch(`/api/topics/answers`)
    if (res.ok) {
        const answers = await res.json();
        dispatch(getAllAnswers(answers));
        return answers;
    } else {
        const errs = await res.json()
        return errs;
    }
}

// create answer
export const thunkCreateAnswer = (answer) => async dispatch => {    
    const res = await fetch('/api/answers/new', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answer),
    })

    if (res.ok) {
        const answer= await res.json();
        dispatch(createAnswer(answer));
        return answer;
      } else {
        const errs = await res.json();
        return errs;
      }
}

// edit answer
export const thunkEditAnswer = (formData, answerId) => async dispatch => {
    const res = await fetch(`/api/answers/${answerId}/edit`, {
        method: "PUT",
        body: formData
    })

    if (res.ok) {
        const answer= await res.json();
        dispatch(createAnswer(answer));
        return answer;
      } else {
        const errs = await res.json();
        return errs;
      }
} 

// delete a answer
export const thunkDeleteAnswer = (answerId) => async (dispatch) => {
    const res = await fetch(`/api/answers/${answerId}/delete`, {
      method: 'DELETE',
    })
  
    if(res.ok) {
      dispatch(deleteAnswer(answerId));
      return answerId;
    } else {
      const errs = await res.json();
      return errs;
    }
  }

// answer reducer
const initialState = {};

function answerReducer(state = initialState, action) {
    switch (action.type) {
        case GET_TOPIC_ANSWERS: {
            const newState = {...state}
            action.answers.forEach(answer => {
                newState[answer.id] = answer
            })
            return newState;
        }
        case GET_QUESTION_ANSWERS: {
            const newState = {...state}
            action.answers.forEach(answer => {
                newState[answer.id] = answer
            })
            return newState;
        }
        case GET_AUTHOR_ANSWERS: {
            const newState = {...state}
            action.answers.forEach(answer => {
                newState[answer.id] = answer
            })
            return newState;
        }
        case GET_ALL_ANSWERS: {
            const newState = {...state}
            action.answers.forEach(answer => {
                newState[answer.id] = answer
            })
            return newState;
        }
        case CREATE_ANSWER: {
            const newState = {...state}
            newState[action.answer.id] = action.answer
            return newState
        }
        case DELETE_ANSWER: {
            const newState = {...state}
            delete newState[action.answerId] 
            return newState
        }
        case RETURN_INITIAL: {
            return initialState;
        }
        default:
        return state;
    }
}

export default answerReducer;