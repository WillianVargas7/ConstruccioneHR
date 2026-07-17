document.addEventListener("DOMContentLoaded", () => {

  /* ==========================
     MENÚ HAMBURGUESA
  ========================== */

  const toggle = document.querySelector(".navbar-toggle");
  const navbar = document.querySelector(".navbar");

  if (toggle && navbar) {

    toggle.addEventListener("click", () => {
      navbar.classList.toggle("active");
    });

    // Cerrar menú al hacer clic en un enlace
    navbar.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navbar.classList.remove("active");
      });
    });

  }


  /* ==========================
     HEADER STICKY
  ========================== */

  const header = document.querySelector(".main-header");

  if (header) {

    function actualizarHeader() {

      if (window.scrollY > 50) {
        header.classList.add("fixed");
      } else {
        header.classList.remove("fixed");
      }

    }

    actualizarHeader();

    window.addEventListener("scroll", actualizarHeader);

  }

});