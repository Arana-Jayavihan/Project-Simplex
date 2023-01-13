import { combineReducers } from "redux";
import authReducers from "./authReducers";
import userReducers from "./userReducers";
import categoryReducers from "./categoryRecuders";
import productReducers from "./productReducers";
import orderReducers from "./orderReducers"

const rootReducer = combineReducers({
    auth: authReducers,
    user: userReducers,
    category: categoryReducers,
    product: productReducers,
    order: orderReducers
})

export default rootReducer