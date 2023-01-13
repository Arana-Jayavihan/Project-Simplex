import express from 'express'
import initData from '../controller/initDataControl.js'
const router = express.Router()

router.post('/initialData', initData)

export default router