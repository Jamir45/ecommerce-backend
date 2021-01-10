const admin = require("firebase-admin");
const serviceAccount = require("./not/ecommerce-simple-firebase-adminsdk-x0adb-08c086aa27.json");
admin.initializeApp({
credential: admin.credential.cert(serviceAccount),
databaseURL: "https://ecommerce-simple.firebaseio.com"
});

module.exports.requireLogin = (req, res, next) => {

   const {authorization} = req.headers
   if(!authorization){
      return res.status(401).send({error:"You are not sing in user"})
   }
   admin.auth().verifyIdToken(authorization)
   .then((decodedToken) => {
      loggedInUser = decodedToken
      next()
   })
   .catch((error) => {
      res.status(401).send({error:"You are not sing in user"})
   });
}