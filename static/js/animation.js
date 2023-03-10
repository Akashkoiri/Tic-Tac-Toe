const srch_screen = document.querySelector('.search-scrn')
const inner = document.querySelectorAll('.inner')
const logo = document.querySelector('.vs_logo')
const avatar = document.querySelectorAll('.avatar')
const names = document.querySelectorAll('.name')
const loader = document.querySelector('.loader')



let num = Math.floor(Math.random() * (9 - 1) + 1)

avatar[0].addEventListener('animationend', ()=> {
    avatar[0].classList.remove('first')
    avatar[0].style.top = '200px'
    avatar[0].classList.add('anime')
})

function search_anime() {
    console.log('Search Anime')
    avatar[0].setAttribute('src', `/img/avatars/default.jpg`)
    avatar[1].setAttribute('src', `/img/avatars/default.jpg`)
    avatar[0].classList.remove('anime')
    avatar[0].classList.add('first')
    avatar[1].style.top = '200px'
    avatar[1].classList.add('anime')
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
    avatar[0].classList.remove('anime')
    avatar[1].classList.remove('anime')
    avatar[0].style.top = '0px'
    avatar[1].style.top = '0px'
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



