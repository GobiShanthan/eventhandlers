import mongoose from 'mongoose'
const Schema = mongoose.Schema


const orderSchema = new Schema({
    user:{type: Schema.Types.ObjectId, ref: "User"},
    packageItems:[{type: Schema.Types.ObjectId, ref: "User"}],
    shippingAddress:{type:String},
    paymentMethod:{type:Boolean,default:false},
    totalPrice:{type:String},
    isPaid:{type:String},
    paidAt:{type:String},
    delivery:{type:String},
    isDelivered:{type:String},
    deliveredAt:{type:String},
    status:{type:String}
},{timestamps:true})


module.exports = mongoose.model('Order',orderSchema)
