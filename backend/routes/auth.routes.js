var session_check = require("../middlewares/middleware")
const router = require("express").Router();



const Users = require("../models/user.model")
const Memes = require("../models/meme.model")

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const fs = require('fs');

require("dotenv").config()
const SECRET = process.env.SECRET

const formidable = require('formidable');

router.post("/register", async (req,res) => {
    try {
        console.log(req.body)
        const form = formidable();
        await form.parse(req, async (err, fields, files) => {
            let newEmail = fields.email
            let newUsername = fields.username
            let nuL = newUsername.length
            let newPassword = fields.password
            let npL = newPassword.length


            let response = {};
            let ok = false;
            if(newEmail === '') {
                response.email = "is missing"
                ok = true;
            }
            if(newUsername === '') {
                response.username = "is missing"
                ok = true;
            }
            if(newPassword === '') {
                response.password = "is missing"
                ok = true;
            }

            if(ok) {
                console.log("Error")
                console.log(response)
                return res.status(400).send(response)
            }
            var data = null
            data = await Users.findOne({username: fields.username})
            if(data != null) {
                console.log("already exists")
                return res.status(400).send({username:"already exists"})
            }


            if(newEmail.endsWith("@stud.acs.upb.ro") && ((nuL > 7)&&(nuL < 33))  && ((npL > 7)&&(npL < 33))) {
                const testElement = new Users({
                    email: fields.email,
                    username: fields.username,
                    password: bcrypt.hashSync(fields.password, salt)
                })
                console.log("Before save:")
                console.log(testElement)
                await testElement.save()
                console.log("After save:")
                console.log(testElement)
                return res.status(200).send(testElement)
            } else {
                response = {};
                if(!newEmail.endsWith("@stud.acs.upb.ro")) {
                    response.email = "the field must end in @stud.acs.upb.ro"
                }
                if(!((nuL > 7)&&(nuL < 33))) {
                    response.username = "the field must be between 8 and 32 charachetrs"
                }
                if(!((npL > 7)&&(npL < 33))) {
                    response.password = "the field must be between 8 and 32 charachetrs"
                }
                console.log("Error")
                console.log(response)
                return res.status(400).send(response)
            }
        });

    } catch(error) {
        console.log(error)
        return res.status(500).send("Am murit")
    }
});

router.post("/login", async (req,res) => {
    try {
        console.log(req.body)
        const form = formidable();
        await form.parse(req, async (err, fields, files) => {
            let newUsername = fields.username
            let newPassword = fields.password

            let response = {};
            let ok = false;
            if(newUsername === '') {
                response.username = "is missing"
                ok = true;
            }
            if(newPassword === '') {
                response.password = "is missing"
                ok = true;
            }

            if(ok) {
                console.log("Err")
                console.log(response)
                return res.status(400).send(response)
            }


            const data = await Users.findOne({username: fields.username})

            if(data) {
                const myPlaintextPassword =  fields.password;
                const hash = data.password
                if(bcrypt.compareSync(myPlaintextPassword, hash) === true) {

                    var token = jwt.sign({"username" : fields.username}, SECRET);

                    console.log({'token': token})
                    return res.status(200).send({'token': token})
                }
                console.log(myPlaintextPassword)
                console.log(hash)
                console.log("Err")
                console.log("Wrong email or password")
                return res.status(400).send({message: "Wrong email or password"})


            } else {
                console.log("Err")
                console.log("Wrong email or password")
                return res.status(400).send({message: "Wrong email or password"})
            }
        });


    } catch(error) {
        console.log(error)
        return res.status(500).send("Am murit")
    }
});

module.exports = router
