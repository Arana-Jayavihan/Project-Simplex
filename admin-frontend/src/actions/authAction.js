import axios from "axios"
import axiosInstance from "../helpers/axios"
import { authConsts } from "./constants"

export const login = (user) => {

    return async (dispatch) => {
        dispatch({ type: authConsts.LOGIN_REQUEST })
        const response = await axiosInstance.post('/admin/signin', {
            ...user
        })

        if (response.status === 200) {
            const { token, user } = response.data;
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            dispatch({
                type: authConsts.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            })
        } else {
            if (response.status === 400) {
                dispatch({
                    type: authConsts.LOGIN_FALIURE,
                    payload: { error: response.data.error }
                })
            }
        }
    }
}

// export const signup = (user) => {

//     return async(dispatch) => {
//         dispatch({ type: userConsts.USER_REGISTRATION_REQUEST})
//         const response = await axiosInstance.post('/admin/signup', {
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

export const isLoggedIn = () => {
    return async dispatch => {
        const token = localStorage.getItem('token')
        if (token) {
            const user = JSON.parse(localStorage.getItem('user'))
            dispatch({
                type: authConsts.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            })
        } else {
            dispatch({
                type: authConsts.LOGIN_FALIURE,
                payload: { error: 'Failed to login' }
            })
        }
    }
}

export const signout = () => {
    return async dispatch => {
        dispatch({ type: authConsts.LOGOUT_REQUEST })
        const res = await axiosInstance.post(`/admin/signout`)

        if (res.status === 200) {
            localStorage.clear()
            dispatch(
                { type: authConsts.LOGOUT_SUCCESS }
            )
        }
        else {
            dispatch(
                {
                    type: authConsts.LOGOUT_FAILED,
                    payload: { error: res.data.error }
                })
        }
    }
}