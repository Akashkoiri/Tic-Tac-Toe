const srch_screen = document.querySelector('.search-scrn')
const inner = document.querySelectorAll('.inner')
const logo = document.querySelector('.vs_logo')
const avatar = document.querySelectorAll('.avatar')
const names = document.querySelectorAll('.name')
const loader = document.querySelector('.loader')

let num = setImage()


function search_anime() {
    avatar[1].setAttribute('src', `/img/avatars/default.jpg`)
    avatar[0].setAttribute('src', `/img/avatars/default.jpg`)
    logo.classList.add('hide')
    names[0].classList.add('hide')
    names[1].classList.add('hide')
    loader.classList.remove('hide')
    inner[0].classList.add('anime1')
    inner[1].classList.add('anime2')
    inner[0].classList.remove('me')
    inner[1].classList.remove('oppo')
    setTimeout(() => {
        srch_screen.classList.remove('hide')
    }, 2000);
}

function connect_anime() {
    avatar[0].setAttribute('src', `/img/avatars/${num}.png`)
    avatar[1].setAttribute('src', `/img/avatars/${num + 1}.png`)
    logo.classList.remove('hide')
    names[0].classList.remove('hide')
    names[1].classList.remove('hide')
    loader.classList.add('hide')
    inner[0].classList.remove('anime1')
    inner[1].classList.remove('anime2')
    inner[0].classList.add('me')
    inner[1].classList.add('oppo')
    setTimeout(() => {
        srch_screen.classList.add('hide')
    }, 3000);
}

function disconnect() {
    alert("Oppponent has quite the game")
    const val = confirm("Search for a new player?")
    if (val) {
        search_anime()
    }
    else {
        window.location = location.origin + '/thanks'
    }
}

function setImage() {
    return Math.floor(Math.random() * (9 - 1) + 1)
}
