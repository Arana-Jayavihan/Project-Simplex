import { productListConsts, productConstants } from "../actions/constants"

const initState = {
    loading: false,
    products: [],
    categories: '',
    productDetails: {},
    error: null
}

export default (state = initState, action) => {
    switch (action.type) {
        case productListConsts.PRODUCTLIST_FETCH_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break
        case productListConsts.PRODUCTLIST_FETCH_SUCCESS:
            state = {
                ...state,
                products: action.payload.products,
                loading: false
            }
            break
        case productListConsts.PRODUCTLIST_FETCH_FAILED:
            state = {
                ...initState
            }
            break
        case productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS:
            state = {
                ...state,
                loading: false,
                productDetails: action.payload.productDetails,
            };
            break;
        case productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            };
            break;
    }
    return state
}
