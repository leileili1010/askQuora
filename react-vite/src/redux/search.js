// action type
const SEARCH_QUESTIONS = "search/SEARCH_QUESTIONS"

export const searchQuestions = (questions) => ({
    type: SEARCH_QUESTIONS,
    questions
})

export const thunkSearchQuestions = () => async(dispatch) => {
    const res = await fetch("/api/questions/")
    if (res.ok) {
      const questions = await res.json()
      dispatch(searchQuestions(questions))
    } else {
      const errs = await res.json()
      return errs;
    }
}

// search reducer
const initialState = {};

function searchReducer(state = initialState, action) {
     switch (action.type) {
        case SEARCH_QUESTIONS: {
            const newState = {...state}
            newState["questions"] = action.questions
            return newState;
        }
        default:
        return state;
     }   
}

export default searchReducer;