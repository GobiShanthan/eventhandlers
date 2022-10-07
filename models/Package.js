import mongoose from 'mongoose'
const Schema = mongoose.Schema

const packageSchema = new Schema({
    user:{type: Schema.Types.ObjectId, ref: "User"},
    title:{type:String},
    description:{type:String},
    price:{type:Number},
    capacity:{type:Number},
    photos:{type:Array}
},{
timestamps:true
})

module.exports = mongoose.model('Package',packageSchema)