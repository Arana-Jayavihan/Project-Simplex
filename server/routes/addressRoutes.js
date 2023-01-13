import express from 'express'
import {addAddress,getAddress} from '../controller/addressController.js'
import {requireSignin,userMiddleware} from '../middlware/index.js'
const router = express.Router();

router.post('/user/address/create',requireSignin,userMiddleware,addAddress);
router.post('/user/getaddress',requireSignin,userMiddleware,getAddress);


export default router;
