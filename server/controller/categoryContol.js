import Category from "../models/category.js"
import slugify from 'slugify'
import shID from 'shortid'

function createCatList(categories, parentId = null) {
    const categoryList = []
    let category
    if (parentId == null) {
        category = categories.filter(cat => cat.parentId == undefined)
    }
    else {
        category = categories.filter(cat => cat.parentId == parentId)
    }

    for (let cat of category) {
        categoryList.push({
            _id: cat._id,
            name: cat.name,
            slug: cat.slug,
            catImg: cat.catImg,
            parentId: cat.parentId,
            children: createCatList(categories, cat._id)
        })
    }
    return categoryList
}

// createCat function get the form data through the request body
// then using that data create a sample onbect and store it in the mongo database
const createCat = (req, res) => {
    const catObject = {
        name: req.body.name,
        slug: `${slugify(req.body.name)}-${shID.generate()}`
    }

    if (req.file) {
        catObject.catImg = process.env.API + '/' + slugify(req.file.filename)
    }

    if (req.body.parentId) {
        catObject.parentId = req.body.parentId
    }

    const cat = new Category(catObject)
    cat.save((error, category) => {
        if (error) {
            return res.status(400).json({ error })
        }
        if (category) {
            return res.status(201).json({ category })
        }
    })
}

const getCat = (req, res) => {
    Category.find({})
        .exec((error, category) => {
            if (error) {
                return res.status(400).json({
                    message: "Category Not Found"
                })
            }
            if (category) {
                const catList = createCatList(category)
                return res.status(200).json({
                    catList
                })
            }
        })
}

const getCatBySlug = (req, res) => {
    const { slug } = req.params
    Category.findOne({ slug: slug })
        .exec((error, category) => {
            if (error) {
                return res.status(400).json({ message: "category not found" })
            }
            if (category) {
                return res.status(200).json({ category })
            }
        })
}

const getCatById = (req, res) => {
    const { id } = req.params
    console.log(id)
    Category.findOne({ _id: id })
        .exec((error, category) => {
            if (error) {
                return res.status(400).json({ message: "category not found" })
            }
            if (category) {
                return res.status(200).json({ category })
            }
        })
}

const getCatByID = async (id) => {
    if (id) {
        const cate = await Category.findOne({ _id: id })
        if (cate) {
            return cate
        }
    }
}

const getCatsBySlug = async (Slug) => {
    if (Slug) {
        const cate = await Category.findOne({ slug: Slug })
        if (cate) {
            return cate
        }
    }
}

const getCategoryPath = async (req, res) => {
    const catArray = []
    const { slug } = req.params
    const cate = await getCatsBySlug(slug)
    if (cate) {
        catArray.push(cate)
    }
    if (cate.parentId) {
        const tCat = await getCatByID(cate.parentId)
        catArray.push(tCat)
        if (tCat.parentId) {
            const gCat = await getCatByID(tCat.parentId)
            catArray.push(gCat)
        }
    }
    
    res.status(200).json({
        catArray
    })
}

const updateCategories = async (req, res) => {
    const { _id, name, parentId, type } = req.body
    const updatedCategories = []
    if (name instanceof Array) {
        for (let i = 0; i < name.length; i++) {
            const category = {
                name: name[i],
                type: type[i]
            }
            if (parentId[i] !== '') {
                category.parentId = parentId[i]
            }
            const updatedCategory = await Category.findOneAndUpdate({ _id: _id[i] }, category, { new: true })
            updatedCategories.push(updatedCategory)

        }
        return res.status(201).json({ updatedCategories })
    }
    else {
        const category = {
            name,
            type
        }
        if (parentId !== '') {
            category.parentId = parentId
        }
        const updatedCategory = await Category.findOneAndUpdate({ _id: _id }, category, { new: true })
        return res.status(201).json({ updatedCategory })
    }

}

const catImgUpdate = async (req, res) => {
    const { catId } = req.body
    const category = {}
    if (req.file) {
        category.catImg = process.env.API + '/' + slugify(req.file.filename)
    }
    const updatedCategory = await Category.findOneAndUpdate({ _id: catId }, category, { new: true })
    if(updatedCategory){
        return res.status(201).json({ updatedCategory })
    }
    else{
        res.status(400).json({ message: "Something went wrong" })
    }
}

const deleteCategories = async (req, res) => {
    const { ids } = req.body.payload
    const delCats = []
    for (let i = 0; i < ids.length; i++) {
        const deleteCategoty = await Category.findOneAndDelete({ _id: ids[i]._id })
        delCats.push(deleteCategoty)
    }
    if (delCats.length == ids.length) {
        res.status(201).json({ message: "Categories removed" })
    }
    else {
        res.status(400).json({ message: "Something went wrong" })
    }
}

export { createCat, getCat, createCatList, updateCategories, deleteCategories, getCatBySlug, getCategoryPath, catImgUpdate }