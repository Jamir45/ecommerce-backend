const express = require('express')
const router = express.Router()

const AllProductsData = require('../Model/insertMany')

// Add To Cart 
router.post('/insert-all', async(req, res) => {
   try {
      const data = new AllProductsData(req.body.item)
      const result = await AllProductsData.insertMany(data)
      res.send({result, success:"All Product Is Successfully inserted"})
   } catch (error) {
      res.status(400).send(error)
   }
})

// Add To Cart 
router.get('/insert-all', async(req, res) => {
   const search = req.query.search
   try {
      const result = await AllProductsData.find({name: {$regex: search}})
      res.send(result)
   } catch (error) {
      res.status(400).send(error)
   }
})



module.exports = router