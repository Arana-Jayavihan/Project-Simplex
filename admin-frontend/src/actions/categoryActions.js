import axiosInstance from "../helpers/axios"
import { catConsts } from "./constants"

export const getAllCategories = () => {
    return async dispatch => {
        dispatch({ type: catConsts.CATEGORY_FETCH_REQUEST })
        const res = await axiosInstance.get('categories/getcategory')

        if (res.status === 200) {

            const catList = res.data.catList
            dispatch({
                type: catConsts.CATEGORY_FETCH_SUCCESS,
                payload: { categories: catList }
            })
        }

        else {
            dispatch({
                type: catConsts.CATEGORY_FETCH_FAILED,
                payload: { error: res.data.error }
            })
        }
    }
}

// joins category create frontend and backend
// addNewCat function get the form that we pass from the category index file
// then we use that form to create a category create request and send it to the backend using axios
// Server responds with success message with status 201 or failed message with 400
// then we use the data from the response and use them in the frontend
export const addNewCat = (form) => {
    return async dispatch => {
        dispatch({ type: catConsts.CATEGORY_CREATE_REQUEST })
        const res = await axiosInstance.post('categories/create', form)
        if (res.status === 201) {
            dispatch({
                type: catConsts.CATEGORY_CREATE_SUCCESS,
                payload: { category: res.data.category }
            })
        }
        else {
            dispatch({
                type: catConsts.CATEGORY_CREATE_FAILED,
                payload: res.data.error
            })
        }
    }
}

export const updateCategories = (form) => {
    return async dispatch => {
        dispatch({ type: catConsts.CATEGORY_UPDATE_REQUEST })
        const res = await axiosInstance.post('/categories/update', form)
        if(res.status === 201 ){
            return(true)
            
        }else{
            return(false)
        }
    }
}

export const updateCatImg = (form) => {
    return async dispatch => {
        dispatch({ type: catConsts.CATEGORY_IMG_UPDATE_REQUEST })
        const res = await axiosInstance.post('/categories/img-update', form)
        if(res.status === 201 ){
            return(true)
            
        }else{
            return(false)
        }
    }
}

export const deleteCategories = (ids) => {
    return async dispatch => {
        const res = await axiosInstance.post('/categories/delete', {
            payload: { ids }
        })
        if(res.status === 201){
            return true
        }
        else{
            return false
        }
    }
}