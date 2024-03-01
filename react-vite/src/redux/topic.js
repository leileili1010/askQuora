const RETURN_INITIAL = "questions/RETURN_INITIAL";
const GET_TOPICS = "questions/GET_TOPICS";

// action creator
export const returnInitial = () => ({
    type: RETURN_INITIAL
});


const getTopics = (topics) => ({
      type: GET_TOPICS,
      topics
});


// thunk
// get all topics
export const thunkGetTopics = () => async (dispatch) => {
    const res = await fetch("/api/topics")
     if (res.ok) {
       const topics = await res.json()
       dispatch(getTopics(topics))
     } else {
       const errs = await res.json()
       return errs;
     }
}

// topics reducer
const initialState = {};

function topicReducer(state = initialState, action) {
    switch (action.type) {
      case GET_TOPICS: {
        const newState = {...state}
        action.topics.forEach(topic => {
          newState[topic.id] = topic
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

export default topicReducer;
