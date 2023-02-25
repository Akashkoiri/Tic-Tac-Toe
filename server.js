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
const User = require('./models.js')

mongoose.set('strictQuery', true)
mongoose.connect(process.env.DB_URL, ()=> {console.log('Connected to DB')})




// Serving static Files
app.use(express.static(path.join(__dirname, 'static')))

// Routes
app.get('/', async (req, res)=> {
    res.sendFile(path.join(__dirname, 'templates/index.html')) 
})



// Sockets
io.on("connection", (socket)=> {
    console.log(`A new user is connected (${typeof socket.id})`)

    
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
        socket.to(room_id).emit('searching')
    })
});




function random() {
    return Math.random().toString(36).substring(2,7)
}

// Listening on port
server.listen(port, ()=> {
    console.log(`Server is listening on http://127.0.0.1:${port}`);
})

