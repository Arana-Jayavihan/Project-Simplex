import axiosInstance from "../helpers/axios"
import { productConsts } from "./constants"

export const addProduct = (form) => {
    return async dispatch => {
        dispatch({ type: productConsts.PRODUCT_ADD_REQUEST})
        const res = await axiosInstance.post('/product/create', form)
        if(res.status === 201){
            dispatch({
                type: productConsts.PRODUCT_ADD_SUCCESS,
                payload: { product : res.data.product }
            })
            return(true)
        }
        else{
            dispatch({
                type: productConsts.PRODUCT_ADD_FAILED,
                payload: res.data.error
            })
        }
    } 
}

export const deleteProducts = (id) => {
    return async dispatch => {
        const res = await axiosInstance.post('/product/delete', { payload: {id} })
        if(res.status === 201){
            return true
        }
        else{
            return false
        }
    }
}

export const publishProduct = (id, published) => {
    return async dispatch => {
        const res = await axiosInstance.post("/product/publishProduct", { payload: {id, published} })
        if(res.status === 201){
            return true
        }
        else{
            return false
        }
    }
}

export const updateProduct = (form) => {
    return async dispatch => {
        dispatch({ type: productConsts.PRODUCT_UPDATE_REQUEST })
        const res = await axiosInstance.post("/product/update", form)
        if(res.status === 201){
            dispatch({
                type: productConsts.PRODUCT_UPDATE_SUCCESS,
                payload: { product : res.data.product }
            })
            return(true)
        }
        else{
            return(false)
        }
    }
}