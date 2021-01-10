const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const CartSchema = new mongoose.Schema({
   key:{type:String},
   img:{type:String},
   name:{type:String},
   price:{type:String},
   seller:{type:String},
   stock:{type:String},
   quantity:{type:Number},
   addedBy:{type:String}
})

const CartSchemaData = mongoose.model('CartSchemaData', CartSchema)
module.exports = CartSchemaData