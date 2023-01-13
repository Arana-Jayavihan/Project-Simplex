import axiosInstance from "../helpers/axios"
import { userConsts } from "./constants"

export const signup = (user) => {

    return async(dispatch) => {
        dispatch({ type: userConsts.USER_REGISTRATION_REQUEST})
        const response = await axiosInstance.post('/admin/signup', {
            ...user
        })
        
        if(response.status === 201){
            const { message } = response.data;
            dispatch({
                type: userConsts.USER_REGISTRATION_SUCCESS,
                payload: {
                    message
                }
            })
        }else{
            if(response.status === 400){
                dispatch({
                    type: userConsts.USER_REGISTRATION_FALIURE,
                    payload: { error: response.data.error }
                })
            }
        }
    }
}