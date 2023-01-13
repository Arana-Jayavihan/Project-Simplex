import mongoose from "mongoose"

const categoryShema = new mongoose.Schema({
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

    catImg: {
        type: String
    },

    type: {
        type: String
    },
    
    parentId: {
        type: String
    }
}, {timestamps: true})

export default mongoose.model('Categories', categoryShema)