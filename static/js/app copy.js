const cells = document.querySelectorAll('.cells')

let board = [0,0,0,
             0,0,0,
             0,0,0]


cells.forEach(element => {
    element.addEventListener('click', ()=> {
        // start here
        if (!board.includes(0)) {
            console.log('Complete')
            return 0
        }
        element.classList.add('circle')
        id = Number(element.id)
        board[id] = 1

        setTimeout(() => {
            id = randTurn(0, 8)
            if (id != null) {
                const element = document.getElementById(id)
                element.classList.add('cross')
                board[id] = 1
            }
        }, 300);
        
    }, {once: true})   
});


function randTurn(min, max) {
    if (board.includes(0)) {
        let randFloatNum = Math.random()
        let random = Math.round((max-min) * randFloatNum)
        let randInt = random + min
        if (board[randInt] == 1) {
            randInt = randTurn(min, max)
        }
        return randInt
    }
    return null
}
