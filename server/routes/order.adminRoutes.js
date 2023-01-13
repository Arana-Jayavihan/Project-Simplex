import express from 'express'
import {requireSignin,adminMiddleware} from '../middlware/index.js'
import {updateOrder,getCustomerOrders,} from"../../server/controller/order.admin.js"
const router = express.Router();

router.post(`/order/update`, requireSignin, adminMiddleware, updateOrder);
router.post(`/order/getCustomerOrders`,requireSignin,adminMiddleware,getCustomerOrders
);

export default router;
