import mongoose from "mongoose"

const productShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    slug: {
        type: String,
        required: true,
        unique: true
    },
    
    price: {
        type: Number,
        required: true,
    },

    stock: {
        type: Number,
        required: true
    },

    storeStock: {
        type: Number,
        default: 0,
        required: true
    },

    description: {
        type: String,
        required: true,
        trim: true,
        max: 200
    },

    offer: {
        type: Number
    },

    productPics: [
        {img: {type: String}}
    ],

    published: {
        type: Boolean,
        default: false
    },

    rating: {
        type: Number,
        required: true,
        default: 0
    },

    brand: {
        type: String,
        required: true,
        default: 'generic'
    },

    color: {
        type: String,
        required: true,
        default: 'generic'
    },

    discount: {
        type: Number,
        default: 0
    },

    discountedPrice: {
        type: Number,
        default: 0
    },

    sizes: [
        {
            size: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
            productCount: Number
        }
    ],

    new: {
        type: Boolean,
        default: false
    },

    featured: {
        type: Boolean,
        default: false
    },

    reviews: [
        {
            userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            review: String
        }
    ],

    updatedAt: Date,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Categories', required: true}

}, 
{
    timestamps: true
},
{
    toJSON: { virtuals: true }
}
)

// productShema.virtual('discountedPrice')
// .get(function(){
//     return this.price * (100 - this.discount)/100
// })

productShema.index({ name: "text" });

productShema.virtual('reviewCount')
.get(function(){
    return this.reviews.length
})

export default mongoose.model('Product', productShema)