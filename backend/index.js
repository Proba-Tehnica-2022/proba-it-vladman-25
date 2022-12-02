const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const cors = require("cors")


const app = express()

require("dotenv").config()

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())


const testRoutes = require("./routes/test.routes")
const middleware = require("./middlewares/middleware")

app.use("/memes", testRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})

mongoose.connect(process.env.MONGO_URL, () => {
    console.log("Mongoose initialized")
})