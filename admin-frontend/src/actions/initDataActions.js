import axiosInstance from "../helpers/axios.js"
import { catConsts, productConsts, orderConstants } from "./constants.js"

export const getInitdata = () => {
    return async dispatch => {
        
        const res = await axiosInstance.post('/initialData')
        if(res.status === 200){
            const {categories,products,orders}  = res.data;
            dispatch({
                type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
               payload: { orders },
             });
            dispatch({
                type: catConsts.CATEGORY_FETCH_SUCCESS,
                payload: { categories },
            });
            dispatch({
                type: productConsts.PRODUCT_FETCH_SUCCESS,
                payload: { products },
            });
        
           
        }
        console.log(res);
    };
};