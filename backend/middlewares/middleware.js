const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET

module.exports = (req,res,next) =>{
    // verifica token ca este valid si ca exista user
    const mytoken = req.headers["token"]
    if (mytoken == null || mytoken == '') {
        return res.status(401).send({message: "The user should be logged in to create a meme"})
    }
    console.log(mytoken)
    var decoded = jwt.verify(mytoken, SECRET)
    console.log(decoded)
    return next()
}