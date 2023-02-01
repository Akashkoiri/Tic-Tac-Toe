const socket = io('ws://127.0.0.1:8080')

function getName() {
    let user = prompt("What's your name")
    if (user == '') {
        getName()
    }
    return user
}
const user = getName()


socket.emit('message', `Hello from ${user}`)

socket.on('message', (message)=> {
    console.log(message)
})
