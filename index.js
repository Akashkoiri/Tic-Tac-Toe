const express = require('express')
const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server)

// // When we access this Backend from a frontend project (React)
// // we have to set this cors settings origin to all
// const io = require('socket.io')(server, {
//     cors: { origin: "*" }
// })

const path = require('path')
const port = process.env.PORT || 8080

// Serving static Files
app.use(express.static(path.join(__dirname, 'static')))


// Routes
app.get('/', (req, res)=> {
    
    res.sendFile(path.join(__dirname, 'templates/index.html')) 
})





// Sockets
io.on("connection", (socket)=> {
    console.log('A new user is connected')

    socket.on('clicked', (data)=> {
        io.emit('clicked', data)
    })

});



// Listening on port
server.listen(port, ()=> {
    console.log(`Server is listening on http://127.0.0.1:${port}`);
})

