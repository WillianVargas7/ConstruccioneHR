document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.querySelector('.navbar-toggle');
  const navbar = document.querySelector('.navbar');
  if (toggleBtn && navbar) {
    toggleBtn.addEventListener('click', () => {
      navbar.classList.toggle('active');
    });
  }
});
// Agrega efecto sticky al header al hacer scroll
window.addEventListener('scroll', () => {
  const header = document.querySelector('.main-header');
  if (window.scrollY > 50) {
    header.classList.add('fixed');
  } else {
    header.classList.remove('fixed');
  }
});
