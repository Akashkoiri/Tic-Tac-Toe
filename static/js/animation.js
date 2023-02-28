const srch_screen = document.querySelector('.search-scrn')
const inner = document.querySelectorAll('.inner')
const logo = document.querySelector('.vs_logo')

function search_anime() {
    logo.classList.add('hide')
    inner[0].classList.add('anime1')
    inner[1].classList.add('anime2')
    inner[0].classList.remove('me')
    inner[1].classList.remove('oppo')
    setTimeout(() => {
        srch_screen.classList.remove('hide')
    }, 2000);
}

function connect_anime() {
    logo.classList.remove('hide')
    inner[0].classList.remove('anime1')
    inner[1].classList.remove('anime2')
    inner[0].classList.add('me')
    inner[1].classList.add('oppo')
    setTimeout(() => {
        srch_screen.classList.add('hide')
    }, 3000);
}