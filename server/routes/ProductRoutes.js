import express from "express"
import multer from 'multer'
import shID from 'shortid'
import path from 'path'
import slugify from 'slugify'
import { createProduct, deleteProduct, getProductDetailsById, getProductsBySulg, pubProd, updateProduct } from "../controller/productContols.js"
import { fileURLToPath } from "url"
import { adminMiddleware, requireSignin } from "../middlware/index.js"

const router = express.Router()

const fileName = fileURLToPath(import.meta.url)
const __dirName = path.dirname(path.dirname(fileName))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirName, 'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shID.generate() + '-' + slugify(file.originalname))
    }
})

const upload = multer({ storage })

router.post('/product/create', requireSignin, adminMiddleware, upload.array('productPic'), createProduct)
router.get('/products/:slug', getProductsBySulg)
router.get('/product/:productId', getProductDetailsById);
router.post('/product/delete', requireSignin, adminMiddleware, deleteProduct)
router.post('/product/publishProduct', requireSignin, adminMiddleware, pubProd)
router.post('/product/update', requireSignin, adminMiddleware, upload.array('productPic'), updateProduct)

export default router