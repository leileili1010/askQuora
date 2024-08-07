const RETURN_INITIAL = "topics/RETURN_INITIAL";
const GET_TOPICS = "topics/GET_TOPICS";
const GET_TOPICS_Questions = "topics/GET_TOPICS_Questions";
const GET_TOPIC = "topics/GET_TOPIC";

// action creator
export const returnTopicInitial = () => ({
    type: RETURN_INITIAL
});


const getTopics = (topics) => ({
      type: GET_TOPICS,
      topics
});

const getTopicsQuestins = (topic_dict) => ({
  type: GET_TOPICS_Questions,
  topic_dict
})

const getTopic = (topic) => ({
  type: GET_TOPIC,
  topic
})



// thunk
// get all topics
export const thunkGetTopics = () => async (dispatch) => {
    const res = await fetch("/api/topics/")
     if (res.ok) {
       const topics = await res.json()
       dispatch(getTopics(topics))
     } else {
       const errs = await res.json()
       return errs;
     }
}

// get topics and related questions for each of them 
export const thunkGetTopicsQuestions = () => async (dispatch) => {
  const res = await fetch("/api/topics/topics-questions")
  if (res.ok) {
    const topics_dict = await res.json()
    dispatch(getTopicsQuestins(topics_dict))
  } else {
    const errs = await res.json()
    return errs;
  }
}

// get a topic with all its questions
export const thunkGetTopic = (topicId) => async(dispatch) => {
  const res = await fetch(`/api/topics/${topicId}/questions`)
  
  if (res.ok) {
    const topic = await res.json()
    dispatch(getTopic(topic))
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
      case GET_TOPIC: {
        return { ...state, [action.topic.id]: action.topic };
      }
      case GET_TOPICS_Questions: {
        return {...action.topic_dict}
      }
      case RETURN_INITIAL: {
        return initialState;
      }
      default:
        return state;
    }
}

export default topicReducer;
