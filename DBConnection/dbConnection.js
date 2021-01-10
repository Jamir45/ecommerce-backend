const mongoose = require('mongoose')

require('dotenv').config()
const uri = process.env.DB_PATH

module.exports.dbConnection = async() => {
   try {
      await mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
      console.log("Database is successfully connected")
   } catch (error) {
      console.log("Connection failed, Internal server error")
   }
}