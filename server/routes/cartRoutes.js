import express from 'express'
import {addItemToCart,getCartItems} from '../controller/cartController.js'
import {requireSignin,userMiddleware} from '../middlware/index.js'
const router = express.Router();

router.post('/user/cart/addtocart',requireSignin,userMiddleware,addItemToCart);
router.post('/user/getCartItems',requireSignin,userMiddleware,getCartItems);


export default router;