const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken');
require('dotenv').config()

// UserSchemaData
const UserSchemaData = require('../Model/userModel');
const { requireLogin } = require('../CustomMiddleware/requireLogin');


router.post('/user-registration', [
   check('name', 'Name is require').notEmpty(),
   check('email', 'Email is require').notEmpty(),
   check('email', 'Email is not valid').isEmail(),
   check('password', 'Password is require').notEmpty(),
   check('confirm_password', 'Confirm Password is require').notEmpty(),
   check('confirm_password').custom((value, {req}) => {
      if (value !== req.body.password) {
         throw new Error ("Confirm Password Is Not Match")
      }else{
         return true
      }
   })
], async(req, res) => {
   const {name, email, password} = req.body.signupUser
   try {
      const errors = validationResult(req)
      if (!errors.isEmpty) {
         const errorObj = errors.array().filter( object => object.msg)[0]
         return res.status(400).send({error:errorObj.msg})
      }
      const usedEmail = await UserSchemaData.findOne({email:email})
      if (usedEmail) {
         res.status(400).send({error:"This email is used"})
      }
      const hashedPassword = await bcrypt.hash(password, 10)
      const newUser = new UserSchemaData({
         name,
         email,
         hashedPassword,
      })
      await newUser.save()
      res.send({success:"User Registration Successful."})
   } catch (error) {
      res.status(500).send(error)
   }
})

// Add To Cart 
router.put('/place-order', requireLogin, async(req, res) => {
   // const {key, img, name, seller, price, stock, quantity} = req.body.cart
   // const product = {key, img, name, seller, price, stock, quantity:key}
   try {
      const data = await UserSchemaData.findOneAndUpdate(req.body.email, {
         $push:{orderedProduct: req.body.product}
      }, {new: true}
      )
      await data.save()
      res.send({data, success:"Product Is Successfully Added"})
   } catch (error) {
      res.status(400).send(error)
   }
})




module.exports = router