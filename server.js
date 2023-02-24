const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
    cors: { origin: "*" }
})
const path = require('path')
const port = process.env.PORT || 80

// Redis Setup
const redis = require("redis");
const cache = redis.createClient('redis://127.0.0.1:6379');

cache.connect()

cache.on('error', (err) => console.log('Redis Client Error: ', err));


// // Setting data
// cache.lPush('room', String(4734))

// // Getting data
// cache.lRange('room', 0, -1).then((res)=> {
//     console.log(res)
// })




// Serving static Files
app.use(express.static(path.join(__dirname, 'static')))

// Routes
app.get('/', async (req, res)=> {
    res.sendFile(path.join(__dirname, 'templates/index.html')) 
})



// Sockets
io.on("connection", (socket)=> {
    console.log(`A new user is connected (${socket.id})`)

    // setRoom(socket)
    
    const room_id = [...socket.rooms][1]
    socket.on('clicked', (data)=> {
        // Here we are destructuring the roomss obj & 
        // accessing the romm name by using the socket object
        socket.to(room_id).emit('clicked', data)
    })

    socket.on('reset', ()=> {
        socket.to(room_id).emit('reset')
    })

    socket.on('disconnecting', ()=> {
        console.log(`A user is disconnected from (${room_id})`)
        cache.lRem(roomName, 2, String(socket.id))
        socket.to(room_id).emit('searching')
    })
});



function setRoom(socket) {
    // Second time
    let flag
    for (roomName in rooms) {
        if (rooms[roomName].length == 1) {
            rooms[roomName].push(socket.id)
            socket.join(roomName)
            io.to(roomName).emit('connected')
            flag = true
            break
        }
    }

    if (!flag) {
        // First Time
        roomName = random()
        socket.join(roomName)
        cache.lPush(roomName, String(socket.id))

        socket.emit('searching')
        console.log('serching')
    }
}




function random() {
    return Math.random().toString(36).substring(2,7)
}

// Listening on port
server.listen(port, ()=> {
    console.log(`Server is listening on http://127.0.0.1:${port}`);
})

