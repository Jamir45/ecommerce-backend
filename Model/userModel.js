const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
   name:{type:String},
   email:{type:String},
   password:{type:String}
})


const UserSchemaData = mongoose.model('UserSchemaData', userSchema)
module.exports = UserSchemaData