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


// let bestPos
// blankPos.forEach(index => {
//     aiboard[index] = 1
//     let score = minimax(index)

//     if (maxiPlayer) {
//         if (score == 1) {
            
//         }
//     }
//     else {
//         if (score == -1) {
            
//         }
//     }
//     if (score == 0) {
//         bestPos = bestMove(depth+1, maxiPlayer=false)
//     }
// });
