import express from "express"
import multer from 'multer'
import shID from 'shortid'
import path from 'path'
import slugify from 'slugify'
import { fileURLToPath } from "url"
import { adminMiddleware, requireSignin } from "../middlware/index.js"
import { catImgUpdate, createCat, deleteCategories, getCat, getCatBySlug, getCategoryPath, updateCategories } from "../controller/categoryContol.js"

const router = express.Router()
const fileName = fileURLToPath(import.meta.url)
const __dirName = path.dirname(path.dirname(fileName))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirName, 'uploads'))
    },
    filename: function (req, file, cb) {
      console.log(file)
      cb(null, shID.generate() + '-' + slugify(file.originalname))
    }
})

const upload = multer({ storage })

// category create request arrives to the backend through the urt '/categories/create'
// then we check few requirements to create categories, the user must be an admin and he must be logged in to the system
// requireSignin function checks whether the user is signed in with a valid session 
// adminMiddleware function checks whether the user is an admin
// then we use multer to upload the category image from the form
// after that we pass the rest of the request to the create category function in the categoryController
router.post('/categories/create', requireSignin, adminMiddleware, upload.single('catImg'), createCat)
router.get('/categories/getcategory', getCat)
router.post('/categories/update', requireSignin, adminMiddleware, upload.single('catImg'), updateCategories)
router.post('/categories/img-update', requireSignin, adminMiddleware, upload.single('catImg'), catImgUpdate)
router.post('/categories/delete', requireSignin, adminMiddleware, deleteCategories)
router.get('/category/:slug', getCatBySlug)
router.get('/categoryPath/:slug', getCategoryPath)

export default router