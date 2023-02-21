const socket = io('ws://127.0.0.1')


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

