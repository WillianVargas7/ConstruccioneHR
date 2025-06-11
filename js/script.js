document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.querySelector('.navbar-toggle');
  const navbar = document.querySelector('.navbar');
  if (toggleBtn && navbar) {
    toggleBtn.addEventListener('click', () => {
      navbar.classList.toggle('active');
    });
  }
});
