const express = require('express')
const app = express()
const cors = require('cors')

// Default Middleware
app.use(express.json())
app.use(cors())



// Cart Route
const allProductDataRoute = require('./Routers/insertDataRoute')
app.use('/', allProductDataRoute)

// Cart Route
const cartRoute = require('./Routers/cartRoute')
app.use('/', cartRoute)

// User Route
const userRoute = require('./Routers/userRouter')
app.use('/', userRoute)



// Database Connection
const {dbConnection} = require('./DBConnection/dbConnection')
dbConnection()

const PORT = process.env.PORT || 3005
app.listen(PORT, () => console.log(`Server Is Running On Port ${PORT}`))