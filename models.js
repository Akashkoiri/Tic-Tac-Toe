const mongoose = require('mongoose')

const Room = new mongoose.Schema(
    {
        name: String,
        players: [String]
    }
)



module.exports = mongoose.model('Room', Room)
