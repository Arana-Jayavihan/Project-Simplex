import slugify from 'slugify'
import Product from '../models/product-schema.js'
import Category from '../models/category.js'
import shID from 'shortid'


const createProduct = (req, res) => {

    const {
        name, price, stock, description, category
    } = req.body
    let productPics = []

    if (req.files.length > 0) {
        productPics = req.files.map(file => {
            return { img: process.env.API + '/' + slugify(file.filename) }
        })
    }

    const product = new Product({
        name,
        slug: shID.generate() + slugify(req.body.name),
        price,
        stock,
        description,
        productPics,
        category,
        createdBy: req.user._id
    })
    product.save(((error, product) => {
        if (error) {
            return res.status(400).json({ error })
        }
        if (product) {
            res.status(201).json({ product })
        }
    }))
}

let products = []

const reccurCats = async (category) => {
    const children = await Category.find({ parentId: category._id })
    if (children.length === 0) {
        const prods = await Product.find({ category: category._id, published: true })

        if(prods.length > 0){
            products.push({
                cate: category,
                products: prods
            })
        }
        
    }

    else if(children.length > 0){
        for (let cat of children) {
            const grandChildren = await reccurCats(cat)
        }
    }
    
}

const getProductsBySulg = async (req, res) => {
    const { slug } = req.params
    const category = await Category.findOne({ slug: slug })
    if (category === undefined)
        return res.status(400).json({ error })

    else if (category) {
        await reccurCats(category)
        if (products.length > 0) {
            res.status(200).json({ products })
            products = []
        }
        else{
            res.status(201).json({ message: "No products available"})
        }
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.body.payload
    const delProd = await Product.findOneAndDelete({ _id: id })
    res.status(201).json({ message: "product deleted" })

}

const pubProd = async (req, res) => {
    const { id, published } = req.body.payload
    const product = {
        published: published
    }
    const publishedProduct = await Product.findOneAndUpdate({ _id: id }, product, { new: true })
    res.status(201).json({ message: "Product published" })
}

const updateProduct = async (req, res) => {
    const { name, price, description, storeStock, category, brand, stock, rating, color, discount, discountedPrice, newA, featured } = req.body
    const cprod = await Product.findOne({ _id: req.body._id })

    let updatePics = []
    let curPics = []
    if (cprod.productPics.length > 0) {
        curPics = cprod.productPics.map(pic => {
            return { img: pic.img }
        })
    }

    if (req.files.length > 0) {
        updatePics = req.files.map(file => {
            return { img: process.env.API + '/' + slugify(file.filename) }
        })
    }

    const updatedProdPics = curPics.concat(updatePics)

    const product = new Product({
        name,
        slug: shID.generate() + slugify(req.body.name),
        price,
        stock,
        storeStock,
        description,
        brand,
        color,
        rating,
        productPics: updatedProdPics,
        category,
        discount,
        new: newA,
        featured,
        discountedPrice,
        createdBy: req.user._id
    })
    product.save(((error, product) => {
        if (error) {
            return res.status(400).json({ error })
        }
        if (product) {
            res.status(201).json({ product })
        }
    }))

    const oldProd = await Product.findOneAndDelete({ _id: req.body._id })
}

const getProductDetailsById = (req, res) => {
    const { productId } = req.params;
    if (productId) {
        Product.findOne({ _id: productId }).exec((error, product) => {
            if (error) return res.status(400).json({ error });
            if (product) {
                res.status(200).json({ product });
            }
        });
    } else {
        return res.status(400).json({ error: "Params required" });
    }
};


export { createProduct, getProductsBySulg, deleteProduct, pubProd, updateProduct, getProductDetailsById }
