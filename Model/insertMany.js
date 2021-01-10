const mongoose = require('mongoose')

const allProductSchema = new mongoose.Schema({
   key:{type:String,},
   category:{type:String,},
   name:{type:String,},
   seller:{type:String,},
   wholePrice:{type:String,},
   priceFraction:{type:String,},
   stock:{type:String,},
   star:{type:String,},
   starCount:{type:String,},
   img:{type:String,},
   price:{type:String,},
   shipping:{type:String,}
})


const AllProductsData = mongoose.model('AllProductsData', allProductSchema)
module.exports = AllProductsData