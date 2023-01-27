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
    // start here
    const cell = e.target
    const turn = circleTurn ? 'circle' : 'cross'
    // Place Mark
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
// Return only true or false
function checkWin(turn) {
    return winCombinations.some(combination => {
        return combination.every(index => {
            return aiboard[index] == 1 ? true : false
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
    if (turn) {
        alert(`${emoji[turn]} won the match!!`)
    }
    else {
        alert('The match is draw')
    }
}

