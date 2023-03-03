const socket = io()


function webSocket(cell) {
    socket.emit('clicked', 
        {
            'id': socket.id,
            'cell': cell
        }
    )
}

socket.on('reset', ()=> {
    startGame()
})

socket.on('clicked', (data)=> {
    console.log('clicked')
    if (data.id != socket.id) {
        clicked.push(data.cell)  // pushing id
        
        
        const cell = cells[data.cell]
        const turn = circleTurn ? 'circle' : 'cross'

        cell.classList.add(turn)
        if (checkWin(turn)) {
            endGame(turn)
            startGame()
        }
    
        if (checkDraw()) {
            endGame()
            startGame()
        }
    
        // Switch turn
        circleTurn = !circleTurn
        setTurn()

        board.removeAttribute("style");
        rst_button.removeAttribute("style");
    }
})

socket.on('searching', ()=> {
    console.log('searching')
    search_anime()
    
})

socket.on('connected', ()=> {
    console.log('connected')
    connect_anime()
})

socket.on('disconnected', ()=> {
    disconnect()
})
