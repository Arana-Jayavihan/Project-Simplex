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

export const getCatPath = (Slug) => {
    return async dispatch => {
        const res = await axiosInstance.get(`categoryPath/${Slug}`)
        if (res.status === 200 ) {
            dispatch({
                type: catConsts.FETCH_CATEGORY_PATH_SUCCESS,
                payload: res.data.catArray
            })
        }
        else {
            console.log(res)
        }
    }
}

export const getCatBySlug = (slug) => {
    return async dispatch => {
        const res = await axiosInstance.get(`category/${slug}`)
        
        if (res.status === 200) {
            dispatch({
                type: catConsts.GET_CAT_BY_SLUG_SUCCESS,
                payload:  res.data.category
            })
        }
        else {
            console.log(res)
        }
    }
}
