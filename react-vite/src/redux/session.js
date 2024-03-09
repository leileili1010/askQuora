const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const SET_USER_ANSWERS = 'session/setUserAnswers';
const GET_USER_SUBSCRIPTIONS = 'session/getUserSubscriptions';

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER
});

const setUserAnswers = (answers) => ({
  type: SET_USER_ANSWERS,
  answers
})

const getUserSubscriptions = (subscriptions) => ({
  type: GET_USER_SUBSCRIPTIONS,
  subscriptions
})



export const thunkGetUserSubscriptions = () => async (dispatch) => {
  const res = await fetch("/api/subscriptions/current")
    if (res.ok) {
      const subscriptions = await res.json();
      dispatch(getUserSubscriptions(subscriptions));
    } else {
      const errs = await res.json()
      return errs;
    }
}

export const thunkSetUserAnswers = () => async (dispatch) => {
  const res = await fetch(`/api/questions/currrent/answers`)
  if (res.ok) {
      const answers = await res.json();
      dispatch(setUserAnswers(answers));
  } else {
      const errs = await res.json()
      return errs;
  }
}

export const thunkAuthenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/");
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const thunkLogin = (credentials) => async dispatch => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials)
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
};

export const thunkSignup = (formData) => async (dispatch) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: formData
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
};

export const thunkLogout = () => async (dispatch) => {
  await fetch("/api/auth/logout");
  dispatch(removeUser());
};


const initialState = { user: null, userAnswers: null, userSubscriptions: null };

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    case SET_USER_ANSWERS: {
      const newState = {...state}
      newState["userAnswers"] = action.answers
      return newState;
    }
    case GET_USER_SUBSCRIPTIONS: {
      return { ...state, userSubscriptions: action.subscriptions };
    }
    default:
      return state;
  }
}

export default sessionReducer;
