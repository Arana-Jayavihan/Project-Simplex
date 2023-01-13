import axiosInstance from "../helpers/axios"
import { productListConsts, productConstants } from "./constants"

export const getProductBySlug = (slug) => {
    return async dispatch => {
      dispatch({ type: productListConsts.PRODUCTLIST_FETCH_REQUEST });
      const res = await axiosInstance.get(`products/${slug}`);

      if (res.status === 200) {
        dispatch({
          type: productListConsts.PRODUCTLIST_FETCH_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: productListConsts.PRODUCTLIST_FETCH_FAILED,
          payload: res.data.error,
        });
      }
    }
}

export const getProductDetailsById = (payload) => {
    return async dispatch => {
        
        dispatch({ type: productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST });
        let res;
        try {
            const { productId } = payload.params;
            res = await axiosInstance.get(`/product/${productId}`);
            dispatch({
                type: productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
                payload: { productDetails: res.data.product }
            });

        } catch(error) {
            console.log(error);
            dispatch({
                type: productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
                payload: { error: res.data.error }
            });
        }

    }
}