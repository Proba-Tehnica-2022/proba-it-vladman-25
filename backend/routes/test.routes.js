var session_check = require("../middlewares/middleware")
const router = require("express").Router();
const Users = require("../models/user.model")
const Memes = require("../models/meme.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

require("dotenv").config()
const SECRET = process.env.SECRET


router.get("/",async (req,res) => {
    const data = await Memes.find();
    return res.status(200).send(data)
})
router.get("/:id",async (req,res) => {
    const data = await Memes.findById(req.params.id);
    console.log('sending data')
    console.log(data)
    return res.status(200).send(data)
})


router.post("/", session_check, async (req,res) => {
    try {
        console.log('req.body')
        console.log(req.body)

        let newDesc = req.body.description
        if (newDesc.length > 2500) {
            return res.status(400).send({message: "description too long"})
        }

        const mytoken = req.headers["token"]
        var decoded = jwt.verify(mytoken, SECRET)
        const user = await Users.findOne({username: decoded.username})

        const testElement = new Memes({
            description: req.body.description,
            creatorId: user._id
        })
        console.log("Before save:")
        console.log(testElement)
        await testElement.save()
        console.log("After save:")
        console.log(testElement)
        return res.status(200).send(testElement)
    } catch(error) {
        console.log(error)
        return res.status(500).send("Am murit")
    }
})

router.patch("/:id",session_check, async (req,res) => {
    try {
        const data_ini = await Memes.findById(req.params.id);
        const memeuid = data_ini.creatorId
        const mytoken = req.headers["token"]
        var decoded = jwt.verify(mytoken, SECRET)
        const user = await Users.findOne({username: decoded.username})
        const uid = user._id.toString()

        if(memeuid === uid) {
            const data = await Memes.findByIdAndUpdate(req.params.id, {description: req.body.description});
            console.log('edited data')
            console.log(data)
            return res.status(200).send(data)
        }
        console.log(memeuid)
        console.log(uid)
        return res.status(403).send({message : "You can modify only your memes"})
    } catch(error) {
        console.log(error)
        return res.status(500).send("Am murit")
    } 

})

router.delete("/:id",session_check, async (req,res) => {
    try {
        const data_ini = await Memes.findById(req.params.id);
        const memeuid = data_ini.creatorId
        const mytoken = req.headers["token"]
        var decoded = jwt.verify(mytoken, SECRET)
        const user = await Users.findOne({username: decoded.username})
        const uid = user._id.toString()

        if(memeuid === uid) {
            const data = await Memes.findByIdAndDelete(req.params.id);
            console.log('deleted user')
            console.log(data)
            return res.status(200).send("OK")
        }
        console.log(memeuid)
        console.log(uid)
        return res.status(403).send({message : "You can delete only your memes"})
    } catch(error) {
        console.log(error)
        return res.status(500).send("Am murit")
    }

})


router.post("/register", async (req,res) => {
    try {
        console.log('req.body')
        console.log(req.body)
        let newEmail = req.body.email
        let newUsername = req.body.username
        let nuL = newUsername.length
        let newPassword = req.body.password
        let npL = newPassword.length

        let response = new Object;
        let ok = false;
        if(newEmail == '') {
            response.email = "is missing"
            ok = true;
        }
        if(newUsername == '') {
            response.username = "is missing"
            ok = true;
        }
        if(newPassword == '') {
            response.password = "is missing"
            ok = true;
        }

        if(ok) {
            return res.status(400).send(response)
        }
        var data = null
        data = await Users.findOne({username: req.body.username})
        if(data != null) {
            return res.status(400).send({username:"already exists"})
        }


        if(newEmail.endsWith("@stud.acs.upb.ro") && ((nuL > 7)&&(nuL < 33))  && ((npL > 7)&&(npL < 33))) {
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
            return res.status(200).send(testElement)
        } else {
            response = new Object;
            if(!newEmail.endsWith("@stud.acs.upb.ro")) {
                response.email = "the field must end in @stud.acs.upb.ro"
            }
            if(!((nuL > 7)&&(nuL < 33))) {
                response.username = "the field must be between 8 and 32 charachetrs"
            }
            if(!((npL > 7)&&(npL < 33))) {
                response.password = "the field must be between 8 and 32 charachetrs"
            }
            return res.status(400).send(response)
        }

    } catch(error) {
        console.log(error)
        return res.status(500).send("Am murit")
    }
});

router.post("/login", async (req,res) => {
    try {
        console.log('req.body')
        console.log(req.body)

        let newUsername = req.body.username
        let newPassword = req.body.password

        let response = new Object;
        let ok = false;
        if(newUsername == '') {
            response.username = "is missing"
            ok = true;
        }
        if(newPassword == '') {
            response.password = "is missing"
            ok = true;
        }

        if(ok) {
            return res.status(400).send(response)
        }


        const data = await Users.findOne({username: req.body.username})

        if(data) {
            const myPlaintextPassword =  req.body.password;
            const hash = data.password
            if(bcrypt.compareSync(myPlaintextPassword, hash) == true) {

                var token = jwt.sign({"username" : req.body.username}, SECRET);

                return res.status(200).send({'token': token})
            }
            console.log(myPlaintextPassword)
            console.log(hash)
            return res.status(400).send({message: "Wrong email or password"})
                

        } else {
            return res.status(400).send({message: "Wrong email or password"})
        }

    } catch(error) {
        console.log(error)
        return res.status(500).send("Am murit")
    }
});

module.exports = router