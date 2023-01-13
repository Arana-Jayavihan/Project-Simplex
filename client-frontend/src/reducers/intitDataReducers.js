import { initDataConsts } from "../actions/constants";

const initState = {
    loading: false,
    products: [],
    categories: []
}

export default (state = initState, action) => {
    switch(action.type) {
        case initDataConsts.INIT_DATA_FETCH_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break
        
        case initDataConsts.INIT_DATA_FETCH_SUCCESS:
            state = {
                ...state,
                products: action.payload.products,
                categories: action.payload.categories,
                loading: false
            }
            break
        case initDataConsts.INIT_DATA_FETCH_FAILED:
            state = {
                ...initState
            }
            break
    }
    return state
}