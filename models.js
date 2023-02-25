const mongoose = require('mongoose')

const User = new mongoose.Schema(
    {
        room: String,
        players: [String]
    }
)

module.exports = mongoose.model('User', User)
