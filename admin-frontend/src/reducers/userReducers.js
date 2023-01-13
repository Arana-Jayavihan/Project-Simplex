import { userConsts } from "../actions/constants"

const initState = {
    error: null,
    message: '',
    loading: false
}

export default (state = initState, action) => {
    switch(action.type){
        case userConsts.USER_REGISTRATION_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break
        
        case userConsts.USER_REGISTRATION_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.payload.message
            }
            break
        
            case userConsts.USER_REGISTRATION_FALIURE:
                state = {
                    ...state,
                    loading: false,
                    error: action.payload.error
                }
                break
    }   
    return state
}