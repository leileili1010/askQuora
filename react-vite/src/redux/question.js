// action type
const RETURN_INITIAL = "questions/RETURN_INITIAL";
const GET_QUESTIONS = "questions/GET_QUESTIONS";
const GET_TOPIC_QUESTIONS = "questions/GET_TOPIC_QUESTIONS";
const GET_QUESTION = "questions/GET_QUESTION";
const CREATE_QUESTION = "questions/CREATE_QUESTION";


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

const getQuestion = (question) => ({
  type: GET_QUESTION,
  question
});

const createQuestion = (question) => ({
  type: CREATE_QUESTION,
  question
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

// get A question baded on id
export const thunkGetQuestion = (questionId) => async (dispatch) => {
  const res = await fetch(`/api/questions/${questionId}`)
   if (res.ok) {
     const question = await res.json()
     dispatch(getQuestion(question))
   } else {
     const errs = await res.json()
     return errs;
   }
}

// create question
export const thunkCreateQuestion = (formData) => async (dispatch) => {
  const res = await fetch(`/api/questions/new`, {
    method: "POST",
    body: formData,
  })

 if (res.ok) {
    const question = await res.json();
    dispatch(createQuestion(question));
    return question;
  } else {
    const errs = await res.json();
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
      case GET_QUESTION: {
        return { ...state, [action.question.id]: action.question };
      }
      case CREATE_QUESTION: {
        const newState = {...state}
        newState[action.question.id] = action.question
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