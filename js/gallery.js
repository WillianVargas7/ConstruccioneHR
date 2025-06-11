document.addEventListener('DOMContentLoaded', () => {
  // Para cada galería (definida por data-gallery)
  const galleries = {};

  // Recorrer todas las secciones .gallery-card
  document.querySelectorAll('.gallery-card').forEach((section) => {
    // Obtener identificador (p.ej. "p1" si data-gallery="p1")
    const thumbContainer = section.querySelector('.thumbnails');
    const galleryId = thumbContainer.getAttribute('data-gallery');

    // Obtener todas las URL de miniaturas en un array
    const thumbs = Array.from(thumbContainer.querySelectorAll('.thumb'));
    const imageUrls = thumbs.map((img) => img.getAttribute('src'));

    // Guardar referencia al elemento de imagen grande
    const mainImg = section.querySelector('.gallery-current');

    // Inicializar índice y actualizar estado
    let currentIndex = 0;
    thumbs[currentIndex].classList.add('selected');
    galleries[galleryId] = { thumbs, mainImg, currentIndex };

    // Al hacer clic en una miniatura, actualizar imagen principal
    thumbs.forEach((thumb, idx) => {
      thumb.addEventListener('click', () => {
        updateMainImage(galleryId, idx);
      });
    });

    // Eventos para flechas “prev” y “next”
    section.querySelector('.prev').addEventListener('click', () => {
      navigateGallery(galleryId, -1);
    });
    section.querySelector('.next').addEventListener('click', () => {
      navigateGallery(galleryId, +1);
    });
  });

  // Función para actualizar la imagen principal y la miniatura activa
  function updateMainImage(galleryId, newIndex) {
    const gallery = galleries[galleryId];
    const { thumbs, mainImg } = gallery;
    // Limitar entre 0 y thumbs.length - 1
    if (newIndex < 0) newIndex = thumbs.length - 1;
    if (newIndex >= thumbs.length) newIndex = 0;

    // Remover clase “selected” de la miniatura anterior
    thumbs[gallery.currentIndex].classList.remove('selected');
    // Añadir clase “selected” a la nueva miniatura
    thumbs[newIndex].classList.add('selected');

    // Cambiar la imagen principal
    mainImg.setAttribute('src', thumbs[newIndex].getAttribute('src'));
    gallery.currentIndex = newIndex;
  }

  // Función para navegar con flechas
  function navigateGallery(galleryId, direction) {
    const gallery = galleries[galleryId];
    updateMainImage(galleryId, gallery.currentIndex + direction);
  }
});
// script.js (al final)
document.querySelector('.navbar-toggle')?.addEventListener('click', () => {
  document.querySelector('.navbar')?.classList.toggle('active');
});
