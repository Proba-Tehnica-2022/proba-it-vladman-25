const router = require("express").Router();
const Users = require("../models/user.model")
const Memes = require("../models/meme.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const SECRET = process.env.SECRET


require("dotenv").config()

router.get("/",async (req,res) => {
    const data = await Memes.find();
    return res.send(data)
})
router.get("/:id",async (req,res) => {
    const data = await Memes.findById(req.params.id);
    console.log('sending data')
    console.log(data)
    return res.send(data)
})

router.post("/",async (req,res) => {
    try {
        console.log('req.body')
        console.log(req.body)

        const testElement = new Memes({
            description: req.body.description
        })
        console.log("Before save:")
        console.log(testElement)
        await testElement.save()
        console.log("After save:")
        console.log(testElement)
        return res.send("OK")
    } catch(error) {
        console.log(error)
        return res.status(500).send("Am murit")
    }
})

router.patch("/:id",async (req,res) => {
    try {
        const data = await Memes.findByIdAndUpdate(req.params.id, {description: req.body.description});
        console.log('edited data')
        console.log(data)
        return res.send("OK")
    } catch(error) {
        console.log(error)
        return res.status(500).send("Am murit")
    }

})

router.delete("/:id",async (req,res) => {
    try {
        const data = await Memes.findByIdAndDelete(req.params.id);
        console.log('deleted user')
        console.log(data)
        return res.send("OK")
    } catch(error) {
        console.log(error)
        return res.status(500).send("Am murit")
    }

})


router.post("/register", async (req,res) => {
    try {
        console.log('req.body')
        console.log(req.body)
        const testElement = new Users({
            email: req.body.email,
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, salt)
        })
        console.log("Before save:")
        console.log(testElement)
        await testElement.save()
        console.log("After save:")
        console.log(testElement)
        return res.send("OK")
    } catch(error) {
        console.log(error)
        return res.status(500).send("Am murit")
    }
});

router.post("/login", async (req,res) => {
    try {
        console.log('req.body')
        console.log(req.body)
        const data = await Users.findOne({username: req.body.username})

        if(data) {
            const myPlaintextPassword =  req.body.password;
            const hash = data.password
            if(bcrypt.compareSync(myPlaintextPassword, hash) == true) {

                var token = jwt.sign(req.body, SECRET);

                // return res.send("OK")
                return res.send({'jwt-token': token})
            }
            console.log(myPlaintextPassword)
            console.log(hash)
            return res.send("Wrong pass") 
                

        } else {
            return res.send("No user")
        }

    } catch(error) {
        console.log(error)
        return res.status(500).send("Am murit")
    }
});

module.exports = router