import { authConsts } from "../actions/constants";

const initState = {
  token: null,
  user: {
    firstname: "",
    lastName: "",
    email: "",
    picture: "",
  },
  authenticated: false,
  authenticating: false,
  loading: false,
  error: null,
  message: "",
};

export default (state = initState, action) => {
  console.log(action);
  switch (action.type) {
    case authConsts.LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
      };
      break;

    case authConsts.LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticated: true,
        authenticating: false,
      };
      break;

    case authConsts.LOGIN_FALIURE:
      state = {
        ...state,
      };
      break;

    case authConsts.LOGOUT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;

    case authConsts.LOGOUT_SUCCESS:
      state = {
        ...initState,
      };
      break;

    case authConsts.LOGOUT_FAILED:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
  }
  return state;
};
