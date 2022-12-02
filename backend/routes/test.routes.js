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
    return res.send(data)
})
router.get("/:id",async (req,res) => {
    const data = await Memes.findById(req.params.id);
    console.log('sending data')
    console.log(data)
    return res.send(data)
})


router.post("/", session_check, async (req,res) => {
    try {
        console.log('req.body')
        console.log(req.body)

        let newDesc = req.body.description
        if (newDesc.length > 2500) {
            return res.status(400).send({message: "description too long"})
        }
        const testElement = new Memes({
            description: req.body.description
        })
        console.log("Before save:")
        console.log(testElement)
        await testElement.save()
        console.log("After save:")
        console.log(testElement)
        return res.status(200).send("OK")
    } catch(error) {
        console.log(error)
        return res.status(500).send("Am murit")
    }
})

router.patch("/:id",session_check, async (req,res) => {
    try {
        const data = await Memes.findByIdAndUpdate(req.params.id, {description: req.body.description});
        console.log('edited data')
        console.log(data)
        return res.status(200).send("OK")
    } catch(error) {
        console.log(error)
        return res.status(500).send("Am murit")
    }

})

router.delete("/:id",session_check, async (req,res) => {
    try {
        const data = await Memes.findByIdAndDelete(req.params.id);
        console.log('deleted user')
        console.log(data)
        return res.status(200).send("OK")
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

                var token = jwt.sign(req.body, SECRET);

                // return res.send("OK")
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