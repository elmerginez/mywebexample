let navbar = document.getElementById('navbar');
let toggle = document.getElementById('toggle').onclick = toggleNav;
let state = false;

function toggleNav() {
    if (state == false) {
        navbar.style.display = 'flex';
        state = true;
    } else {
        navbar.style.display = 'none';
        state = false;
    }
}