import axiosInstance from "../helpers/axios";
import { authConsts,cartConstants } from "./constants";

export const login = (user) => {
  return async (dispatch) => {
    dispatch({ type: authConsts.LOGIN_REQUEST });
    const response = await axiosInstance.post("/signin", {
      ...user,
    });

    if (response.status === 200) {
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: authConsts.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      })
      return(true)
    } else {
      if (response.status === 400) {
        dispatch({
          type: authConsts.LOGIN_FALIURE,
          payload: { error: response.data.error },
        })
        return(false)
      }
    }
  };
};

// export const signup = (user) => {

//     return async(dispatch) => {
//         dispatch({ type: userConsts.USER_REGISTRATION_REQUEST})
//         const response = await axiosInstance.post('/signup', {
//             ...user
//         })

//         if(response.status === 201){
//             const { message } = response.data;
//             dispatch({
//                 type: userConsts.USER_REGISTRATION_SUCCESS,
//                 payload: {
//                     message
//                 }
//             })
//         }else{
//             if(response.status === 400){
//                 dispatch({
//                     type: userConsts.USER_REGISTRATION_FALIURE,
//                     payload: { error: response.data.error }
//                 })
//             }
//         }
//     }
// }

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: authConsts.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      })
    } else {
      dispatch({
        type: authConsts.LOGIN_FALIURE,
        payload: { error: "Failed to login" },
      });
    }
  };
};

export const signout = (user) => {
    return async (dispatch) => {
      dispatch({ type: authConsts.LOGOUT_REQUEST });
      localStorage.clear();
      dispatch({ type: authConsts.LOGOUT_SUCCESS });
      dispatch({ type: cartConstants.RESET_CART });
    };
};
