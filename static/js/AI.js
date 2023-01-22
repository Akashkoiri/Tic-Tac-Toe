const board = document.querySelector('.board')
const cells = document.querySelectorAll('.cells')

const winCombinations = [
    // Horizontal
    [0,1,2],
    [3,4,5],
    [6,7,8],
    // Vertical
    [0,3,6],
    [1,4,7],
    [2,5,8],
    // Diagonal
    [0,4,8],
    [2,4,6]
]

let aiboard = [0,0,0,
               0,0,0,
               0,0,0]



startGame()

function startGame() {     
    cells.forEach(cell => {
        cell.classList = cell.classList[0]
        aiboard.fill(0)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true})   
    });
}

function handleClick(e) {
    // Place Mark
    const cell = e.target
    aiboard[cell.id] = 1
    cell.classList.add('circle')

    if (checkWin('circle')) {
        endGame('circle')
        startGame()
    }

    if (checkDraw()) {
        endGame()
        startGame()
    }

    // AI Move 
    bestMove()  // return a best move with a better chance to win 
}

// calculate, mark & remove Eventlistener
function bestMove() {
    blank = availableMoves(aiboard)[0]
    aiboard[i] = 1
    // check for win & draw

    
    bestMove()
}


// Return all the blank positions
function availableMoves(board, blankPos=[]) {
    for (let i=0; i<board.length; i++) {
        if (board[i] == 0) {
            blankPos.push(i)
        }
    };
    return blankPos
}

// Return only true or false
function checkWin(turn) {
    return winCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(turn)
        })
    })
}
// Return only true or false
function checkDraw() {
    // This is called destructuring ([...cells])
    return [...cells].every(cell => {
        return cell.classList.contains('cross') || cell.classList.contains('circle')
    })
}

function endGame(turn) {
    const emoji = {
        'circle': "⚪",
        'cross': "❌"
    }
    if ('circle') {
        alert(`${emoji['circle']} won the match!!`)
    }
    else {
        alert('The match is draw')
    }
}

