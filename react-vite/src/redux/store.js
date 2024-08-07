import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import questionReducer from "./question";
import topicReducer from "./topic";
import answerReducer from "./answer";
import searchReducer from "./search";
import commentReducer from "./comment";

const rootReducer = combineReducers({
  session: sessionReducer,
  questions: questionReducer,
  topics: topicReducer,
  answers: answerReducer,
  search: searchReducer,
  comments: commentReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
