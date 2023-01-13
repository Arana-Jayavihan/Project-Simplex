import axiosInstance from "../helpers/axios"
import { initDataConsts } from "./constants"

export const getInitdata = () => {
    return async dispatch => {
        dispatch({ type: initDataConsts.INIT_DATA_FETCH_REQUEST})
        const res = await axiosInstance.post('/initialData')
        if(res.status === 200){
            const categories = res.data.categories
            const products = res.data.products
            dispatch({
                type: initDataConsts.INIT_DATA_FETCH_SUCCESS,
                payload: { products, categories }
            })
        }
        else{
            dispatch({
                type: initDataConsts.INIT_DATA_FETCH_FAILED
            })
        }
    }
}