const mongoose = require('mongoose')

const memeSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    creatorId: {
        type: String,
        // required: true,
    }
}, {
    timestamps: true
});

const Meme = mongoose.model('Meme', memeSchema)
module.exports = Meme;