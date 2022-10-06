import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    googleId:{type:String},
    isAdmin:{type:Boolean},
    isVendor:{type:Boolean},
    vendorType:{type:String}
},{timestamps:true})


module.exports = mongoose.model('User',userSchema)
