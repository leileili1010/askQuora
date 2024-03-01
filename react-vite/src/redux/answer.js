// action type
const RETURN_INITIAL = "answers/RETURN_INITIAL";
const GET_TOPIC_ANSWERS = "answers/GET_TOPIC_ANSWERS"
const GET_QUESTION_ANSWERS = "answers/GET_QUESTION_ANSWERS"
const GET_AUTHOR_ANSWERS = "answers/GET_AUTHOR_ANSWERS"

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
        case RETURN_INITIAL: {
            return initialState;
        }
        default:
        return state;
    }
}

export default answerReducer;