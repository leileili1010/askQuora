// action type
const RETURN_INITIAL = "questions/RETURN_INITIAL";
const GET_QUESTIONS = "questions/GET_QUESTIONS";
const GET_TOPIC_QUESTIONS = "questions/GET_TOPIC_QUESTIONS";

// action creator
export const returnInitial = () => ({
    type: RETURN_INITIAL
});


const getQuestions = (questions) => ({
      type: GET_QUESTIONS,
      questions
  });


const getTopicQuestions = (questions) => ({
    type: GET_TOPIC_QUESTIONS,
    questions
});
  

// thunk functions
// get all questions
export const thunkGetQuestions = () => async (dispatch) => {
   const res = await fetch("/api/questions")
    if (res.ok) {
      const questions = await res.json()
      dispatch(getQuestions(questions))
    } else {
      const errs = await res.json()
      return errs;
    }
}

// get topic questions
export const thunkGetTopicQuestions = (topicId) => async (dispatch) => {
  const res = await fetch(`/api/questions/topics/${topicId}`)
   if (res.ok) {
     const questions = await res.json()
     dispatch(getTopicQuestions(questions))
   } else {
     const errs = await res.json()
     return errs;
   }
}

// question reducer
const initialState = {};

function questionReducer(state = initialState, action) {
    switch (action.type) {
      case GET_QUESTIONS: {
        const newState = {...state}
        action.questions.forEach(question => {
          newState[question.id] = question
        })
        return newState
      }
      case GET_TOPIC_QUESTIONS: {
        const newState = {...state}
        action.questions.forEach(question => {
          newState[question.id] = question
        })
        return newState
      }
      case RETURN_INITIAL: {
        return initialState;
      }
      default:
        return state;
    }
}

export default questionReducer