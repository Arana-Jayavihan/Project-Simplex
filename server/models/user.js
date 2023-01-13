import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 25
    },

    lastName:{
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 30
    },

    username:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase:  true
    },

    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },

    hashPass:{
        type: String,
        required: true,
        trim: true,
    },

    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },

    contact: {
        type: String
    },

    profPic:{
        type: String
    },

}, {timestamps: true})

userSchema.virtual('fullName')
.get(function(){
    return `${this.firstName} ${this.lastName}`
})

userSchema.methods = {
    authenticate: async function(plainPass){
        return await bcrypt.compare(plainPass, this.hashPass)
    }
}

export default mongoose.model('User', userSchema)