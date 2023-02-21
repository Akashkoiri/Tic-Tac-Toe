const board = document.querySelector('.board')
const cells = document.querySelectorAll('.cells')
const rst_button = document.getElementById('restart-btn')
const turn_indicator = document.getElementById('turn_indicator')
const circleScore = document.getElementById('circle_score')
const crossScore = document.getElementById('cross_score')

let circleTurn = true;
let clicked = []

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
let score = {
    circle: 0,
    cross: 0
}



startGame()







rst_button.addEventListener('click', ()=>{
    socket.emit('reset')
    startGame()
})

function startGame() {
    // Updating scores
    if (score['circle'] != 0) {
        circleScore.innerText = score['circle']
    }
    
    if (score['cross'] != 0) {
        crossScore.innerText = score['cross']
    }

    clicked = []
    setTurn()
    cells.forEach(cell => {
        cell.classList = cell.classList[0]
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true})   
    });
}

function handleClick(e) {
    // start here
    const cell = e.target
    if (!clicked.includes(cell.id)) {
        clicked.push(cell.id)
        const turn = circleTurn ? 'circle' : 'cross'
        // Sending to websocket
        webSocket(cell.id)  
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
    
        // block user to take turn again until opponents turn is not done
        board.style.setProperty("pointer-events", "none");
        rst_button.style.setProperty("pointer-events", "none");
    }
}

function setTurn() {
    // remove all extra classes
    board.classList = board.classList[0]
    if (circleTurn) {
        board.classList.add('circle')
        turn_indicator.innerText = '0 Turn'
    } 
    else {
        board.classList.add('cross')
        turn_indicator.innerText = 'X Turn'
    }
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
    if (turn) {
        score[turn] += 1
        alert(`${emoji[turn]} won the match!!`)
    }
    else {
        alert('The match is draw')
    }
}

