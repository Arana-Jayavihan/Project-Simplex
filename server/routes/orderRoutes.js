import express from 'express'
import {addOrder,getOrders,getOrder} from '../controller/orderController.js'
import {requireSignin,userMiddleware} from '../middlware/index.js'
const router = express.Router();

router.post("/addOrder", requireSignin, userMiddleware, addOrder);
router.get("/getOrders", requireSignin, userMiddleware, getOrders);
router.post("/getOrder", requireSignin, userMiddleware, getOrder);

export default router;
