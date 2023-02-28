const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
    cors: { origin: "*" }
})
const path = require('path')
require('dotenv').config()
const port = process.env.PORT || 80

// MongoDB Setup
const mongoose = require('mongoose')
const Room = require('./models.js')

mongoose.set('strictQuery', true)
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true})
.catch(err => console.log(`Connection ${err}`));

mongoose.connection.on('open',async ref => {
    console.log('Connected to mongo DB.');
})
mongoose.connection.on('error', err => {
    console.log(`${err}`);
})

// 0: disconnected
// 1: connected
// 2: connecting
// 3: disconnecting
// console.log(mongoose.connection.readyState)




// Serving static Files
app.use(express.static(path.join(__dirname, 'static')))

// Routes
app.get('/', (req, res)=> {
    if (mongoose.connection.readyState == 1) {
        res.sendFile(path.join(__dirname, 'templates/index.html')) 
    }
})



// Sockets
io.on("connection", async (socket)=> {
    console.log(`A new user is connected (${socket.id})`)
    
    await setRoom(socket)

    // Here we are destructuring the roomss obj & 
    // accessing the romm name by using the socket object
    const room_id = [...socket.rooms][1]

    socket.on('clicked', (data)=> {
        socket.to(room_id).emit('clicked', data)
    })

    socket.on('reset', ()=> {
        socket.to(room_id).emit('reset')
    })

    socket.on('disconnecting', async ()=> {
        console.log(`A user is disconnected from (${room_id})`)
        await Room.updateOne(
            {name: `${room_id}`},
            {$pull: {'players': `${socket.id}`}}
        )
        
        socket.to(room_id).emit('searching')
    })
});


// DB CRUD operation
async function setRoom(socket) {
    let room
    try {
        room = await Room.findOneAndUpdate(
            {players: {$not: {$size: 2}}},
            {$push: {'players': `${socket.id}` }}
        )
    }
    catch(e) {
        console.log(`Error: ${e}`)
    }

    if (room) {
        socket.join(room.name)
        io.to(room.name).emit('connected')
    }
    else {
        room = await Room.create(
            {
                name: random(),
                players: [socket.id]
            }
        )
        socket.join(room.name)
        socket.emit('searching')
    }
}


function random() {
    return Math.random().toString(36).substring(2,7)
}

// Listening on port
server.listen(port, ()=> {
    console.log(`Server is listening on http://127.0.0.1:${port}`);
})

