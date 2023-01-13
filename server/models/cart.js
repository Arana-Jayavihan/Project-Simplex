import mongoose from "mongoose"

const cartSchema = new mongoose.Schema({
    user: { type:mongoose.Schema.Types.ObjectId, ref:'User',required:false },
    cartItems:[
        {
         product: { type:mongoose.Schema.Types.ObjectId, ref:'Product',required:false },
         quantity: {type:Number,default:1},
        //  price: {type:Number,required:true}

        }

    ]
 

}, {timestamps: true})

export default mongoose.model('Cart', cartSchema)