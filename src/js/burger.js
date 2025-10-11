const menuButton = document.querySelector('.js-btn-burger-menu');
const closeButton = document.querySelector('.js-close-menu');
const burgerMenu = document.querySelector('.js-burger-menu');
const menuNavLinks = document.querySelectorAll('.js-menu-link');
const logoEl = document.querySelector('.js-logo');

function openMenu() {
  burgerMenu.classList.add('active');
  burgerMenu.style.visibility = 'visible';
  document.body.classList.add('no-scroll');
}

function closeMenu() {
  burgerMenu.classList.remove('active');
  document.body.classList.remove('no-scroll');
  setTimeout(() => {
    burgerMenu.style.visibility = 'hidden';
  }, 300);
}

menuButton.addEventListener('click', openMenu);
closeButton.addEventListener('click', closeMenu);

document.addEventListener('click', event => {
  if (
    !burgerMenu.contains(event.target) &&
    !menuButton.contains(event.target)
  ) {
    closeMenu();
  }
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeMenu();
  }
});

menuNavLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

logoEl.addEventListener('click', closeMenu);
