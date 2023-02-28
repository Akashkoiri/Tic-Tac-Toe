const mongoose = require('mongoose')

const Room = new mongoose.Schema(
    {
        name: String,
        players: [String]
    }
)

// Middleware to delete a blank array
Room.post('updateOne', async function(res) {
    if (res.modifiedCount) {
        await this.deleteMany({players: {$size: 0}}).clone()
    }
})

module.exports = mongoose.model('Room', Room)
