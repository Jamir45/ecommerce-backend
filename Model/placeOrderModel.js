const mongoose = require('mongoose')

const PlaceOrderSchema = new mongoose.Schema({
   name:{type:String},
   email:{type:String},
   userId:{type:String},
   shipping:{},
   products:[],
   totalItem:{type:Number},
   productPrice:{type:Number},
   shippingCharge:{type:Number},
   tax:{type:Number},
   totalAmount:{type:Number},
   paymentInfo:{}
})

const PlaceOrderSchemaData = mongoose.model('PlaceOrderSchemaData', PlaceOrderSchema)
module.exports = PlaceOrderSchemaData