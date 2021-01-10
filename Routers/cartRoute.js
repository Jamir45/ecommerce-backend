const express = require('express')
const router = express.Router()
const { requireLogin } = require('../CustomMiddleware/requireLogin')


const CartSchemaData = require('../Model/cartModel')
const PlaceOrderSchemaData = require('../Model/placeOrderModel')


// Add To Cart 
router.post('/add-to-cart', requireLogin, async(req, res) => {
   const {key, img, name, seller, price, stock, quantity} = req.body.cartProduct
   try {
      const data = new CartSchemaData({
         key,
         img,
         name,
         price,
         seller,
         stock,
         quantity,
         addedBy:loggedInUser.uid
      })
      await data.save()
      res.send({data, success:"Product Is Successfully Added"})
   } catch (error) {
      res.status(400).send(error)
   }
})


// Get Cart Product
router.get('/get-cart-product', requireLogin, async(req, res) => {
   try {
      const data = await CartSchemaData.find({addedBy:loggedInUser.uid})
      res.send(data)
   } catch (error) {
      res.status(400).send(error)
   }
})

// Delete Cart Product
router.delete('/delete-cart-product', requireLogin, async(req, res) => {
   try {
      const removedProduct = await CartSchemaData.findByIdAndDelete({_id:req.body.productId})
      res.send(removedProduct);
   } catch (error) {
      res.status(400).send(error)
   }
})

// Add and Remove quantity
router.put('/add-and-remove-quantity', requireLogin, async(req, res) => {
   const Quantity = req.body.quantity
   try {
      const updatedProduct = await CartSchemaData.findOneAndUpdate({_id:req.body.addedBy}, {
         quantity:Quantity
      }, {new:true})
      res.send(updatedProduct)
   } catch (error) {
      res.status(400).send(error)
   }
})

router.post('/place-order', requireLogin,async (req, res) => {
   const {name, email} = req.body.user
   const products = req.body.products
   const shipping = req.body.shipping
   const paymentInfo = req.body.paymentInfo
   const {totalItem, productPrice, shippingCharge, totalAmount, tax} = req.body.cost

   const orderData = new PlaceOrderSchemaData({
      name,
      email,
      userId:loggedInUser.uid,
      shipping,
      products,
      totalItem,
      productPrice,
      shippingCharge,
      tax,
      totalAmount,
      paymentInfo
   })
   await orderData.save()
   res.send({data: orderData, success:'Order Is Successfully Placed'})
})



module.exports = router