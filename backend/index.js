const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const cors = require("cors")


const app = express()
require("dotenv").config()

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());
// app.use(bodyParser.urlencoded({
//     extended: true
// }))
// app.use(bodyParser.json())




const memeRoutes = require("./routes/meme.routes")
const authRoutes = require("./routes/auth.routes")
const middleware = require("./middlewares/middleware")

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,token')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Control-Request-Headers', 'Access-Control-Allow-Credentials,Access-Control-Allow-Methods,Access-Control-Allow-Headers,Access-Control-Allow-Origin')
    next();
});


app.use(express.static('./uploads'))

app.use("/memes", memeRoutes)
app.use("/auth", authRoutes)


const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})

mongoose.connect(process.env.MONGO_URL, () => {
    console.log("Mongoose initialized")
})