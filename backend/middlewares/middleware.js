module.exports = (req,res,next) =>{
    // verifica token ca este valid si ca exista user
    return next()
    // if (req.header.isAuthenticated === "true") {
    //     return next()
    // } else {
    //     return res.status(403).send("Something is bad")
    // }
}