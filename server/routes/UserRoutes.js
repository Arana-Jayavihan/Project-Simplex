import express from 'express'
import { signin, signup } from '../controller/userContols.js'
import { valSignReq, isReqValidated, validateReq } from '../validators/auth.js'

const router = express.Router()

router.post("/signin", valSignReq, isReqValidated, signin)
router.post("/signup", validateReq, isReqValidated, signup)

export default router