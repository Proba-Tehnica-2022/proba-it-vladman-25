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

router.get("/",async (req,res) => {
    const data = await Memes.find();
    console.log(data)
    return res.status(200).send(data)
})
router.get("/:id",async (req,res) => {
    const data = await Memes.findById(req.params.id);
    console.log('sending data')
    console.log(data)
    return res.status(200).send(data)
})

router.post("/", session_check ,async (req,res) => {
    try {
        console.log('req.body')
        // console.log(req.body)

        const form = formidable({ multiples: true, uploadDir: "./uploads" });

        let nDesc
        let newFile
        await form.parse(req, async (err, fields, files) => {
            nDesc = fields.description
            let newDesc = nDesc || "default"
            console.log(newDesc)
            if (newDesc.length > 2500) {
                return res.status(400).send({message: "description too long"})
            }

            const mytoken = req.headers["token"]
            var decoded = jwt.verify(mytoken, SECRET)
            const user = await Users.findOne({username: decoded.username})


            let testElement = new Memes({
                description: newDesc,
                creatorId: user._id,
                creatorName: decoded.username,
                path: "aaa"
            })



            console.log(files.file)



            newFile = files.file

            if(files.file === undefined) {
                return res.status(400).send({message: "no file"})
            }

            if (newFile.size > 2 * 10e6) {
                console.log("file too big")
                fs.unlinkSync("./uploads/" + newFile.newFilename)
                return res.status(400).send({message: "file too big"})
            }
            if   ((newFile.mimetype !== 'image/png')
                &&(newFile.mimetype !== 'image/jpg')
                &&(newFile.mimetype !== 'image/jpeg')
                &&(newFile.mimetype !== 'image/gif')) {
                fs.unlinkSync("./uploads/" + newFile.newFilename)
                return res.status(400).send({message: "file type not accepted"})
            }
            //.jpg, .jpeg, .png, .gif
            const newPath = "./uploads/" + testElement._id + ".png";
            await fs.rename( "./uploads/" + newFile.newFilename, newPath, function (err) {
                if (err) throw err;
                console.log('File Renamed.');
            });
            const newPath2 = testElement._id + ".png";
            testElement.path = newPath2



            console.log("Before save:")
            console.log(testElement)
            await testElement.save();
            console.log("After save:")
            console.log(testElement)
            return res.status(200).send({message: "OK"})
        });
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

module.exports = router