const board = document.querySelector('.board')
const cells = document.querySelectorAll('.cells')
let circleTurn = true;

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
    setTurn()   
    cells.forEach(cell => {
        cell.classList = cell.classList[0]
        aiboard.fill(0)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true})   
    });
}

function handleClick(e) {
    const cell = e.target
    let turn = circleTurn ? 'circle' : 'cross'
    // Place Mark
    aiboard[cell.id] = turn=='circle' ? -1 : 1
    cell.classList.add(turn)
    if (checkWin()) {
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

    // AI Move
    result = checkWin()
    // console.log(result)
    // best = bestMove()  // return a best move with a better chance to win 
    
    // if (best) {
    //     turn = circleTurn ? 'circle' : 'cross'
    //     aiboard[best] = turn=='circle' ? -1 : 1
    //     cells[best].classList.add(turn)
    // }
    
    // circleTurn = !circleTurn
    // setTurn()
}


function bestMove() {
    blankPos = availableMoves(aiboard)

    let bestScore = -Infinity
    let bestIndex
    blankPos.forEach(index => {
        aiboard[index] = 1
        let score = minimax(0, true)
        // console.log("score: ", score)
        aiboard[index] = 0
        if (bestScore < score) {
            bestScore = score
            bestIndex = index
        }
    });
    return bestIndex
}







function minimax(depth, maxiPlayer){
    result = checkWin()
    console.log("result: ", result)
    if (result) {
        return result
    }
    // else {
    //     if (maxiPlayer) {
    //         blankPos = availableMoves(aiboard)
    //         let bestScore = -Infinity
    //         blankPos.forEach(index => {
    //             aiboard[index] = 1
    //             let score = minimax(depth+1, false)
    //             aiboard[index] = 0
    //             bestScore = Math.max(bestScore, score)
    //         });
    //         return bestScore
    //     }
    //     else {
    //         blankPos = availableMoves(aiboard)
    //         let bestScore = Infinity
    //         blankPos.forEach(index => {
    //             aiboard[index] = 1
    //             let score = minimax(depth+1, true)
    //             aiboard[index] = 0
    //             bestScore = Math.min(bestScore, score)
    //         });
    //         return bestScore
    //     }
    // }
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

function setTurn() {
    // remove all extra classes
    board.classList = board.classList[0]
    if (circleTurn) {
        board.classList.add('circle')
    } 
    else {
        board.classList.add('cross')
    }
}

// Return two things (-1 / 1) / ('circle'/'cross')
function checkWin() {
    obj = {}
    isWin = winCombinations.some(combination => {

        if (combination.every(index => {return aiboard[index] == 1 ? true : false})) {
            obj[true] = 1
            return true
        }
        else if (combination.every(index => {return aiboard[index] == -1 ? true : false})) {
            obj[true] = -1
            return true
        }
        else {
            return false
        }
    })
    if (isWin) {
        if (obj[true] == 1) {
            return 1
        }
        if (obj[true] == -1) {
            return -1
        }
    } 
    else {
        return false
    }
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
    if (turn) {
        alert(`${emoji[turn]} won the match!!`)
    }
    else {
        alert('The match is draw')
    }
}

function randTurn() {
    let randFloatNum = Math.random()
    let random = Math.round((10-0) * randFloatNum)
    return (random + 0)
}

