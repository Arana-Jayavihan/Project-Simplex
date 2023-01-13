import { productConsts } from "../actions/constants";

const initState = {
    loading: false,
    products: []
}

const updateProdList = (product, products) => {
    let productArray = []
    for (let prod of products) {
        productArray.push(prod)
    }
    productArray.push(product)
    return productArray
}

export default (state = initState, action) => {
    console.log(action)
    switch (action.type) {
        default:
            state = {
                ...initState
            }
            break
        case productConsts.PRODUCT_UPDATE_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break
        case productConsts.PRODUCT_UPDATE_SUCCESS:
            const updatedProdListUp = updateProdList(action.payload.product, state.products)
            state = {
                ...state,
                products: updatedProdListUp
            }
            break
        case productConsts.PRODUCT_UPDATE_FAILED:
            state = {
                ...initState
            }
            break
        case productConsts.PRODUCT_ADD_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break
        case productConsts.PRODUCT_ADD_SUCCESS:
            const updatedProdList = updateProdList(action.payload.product, state.products)
            state = {
                ...state,
                products: updatedProdList
            }
            break
        case productConsts.PRODUCT_ADD_FAILED:
            state = {
                ...initState
            }
            break

        case productConsts.PRODUCT_FETCH_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break

        case productConsts.PRODUCT_FETCH_SUCCESS:
            state = {
                ...state,
                products: action.payload.products,
                loading: false
            }
            break

        case productConsts.PRODUCT_FETCH_FAILED:
            state = {
                ...initState
            }
            break
    }
    return state
}
