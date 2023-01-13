import { combineReducers } from "redux";
import categoryReducers from "./categoryRecuders";
import prodListReducers from "./prodListReducers";
import authreducer from "./auth.reducer";
import initDataReducers from './intitDataReducers';
import cartReducer from "./cart.reducer";
import userReducer from "./user.reducer";

const rootReducer = combineReducers({
  initData: initDataReducers,
  category: categoryReducers,
  product: prodListReducers,
  auth: authreducer,
  cart: cartReducer,
  user: userReducer
});

export default rootReducer;
