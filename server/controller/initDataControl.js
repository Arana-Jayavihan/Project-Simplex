import Category from '../models/category.js'
import Product from '../models/product-schema.js'
import Order from '../models/order.js'
import { createCatList } from './categoryContol.js'

const initData = async (req, res) => {
    const categories = await Category.find({}).exec()
    const products = await Product.find({})
        .populate({ path: 'category', select: '_id name slug' })
        .exec()
        const orders = await Order.find({})
        .populate("items.productId", "name")
        .exec();
    res.status(200).json({
        categories: createCatList(categories),
        products,
        orders,
    })

}

export default initData