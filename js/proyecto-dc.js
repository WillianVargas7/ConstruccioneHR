document.addEventListener('DOMContentLoaded', () => {

  const etapas = {
    remodelacion: 12 // Cambia este número por la cantidad real de fotografías
  };

  Object.entries(etapas).forEach(([etapa, total]) => {
    crearGaleria(total);
  });

  function crearGaleria(total) {

    const viewer = document.querySelector('.gallery-viewer[data-gallery="remodelacion"]');
    const thumbnailsContainer = document.querySelector('.thumbnails[data-gallery="remodelacion"]');

    if (!viewer || !thumbnailsContainer) return;

    // Imagen principal
    const currentImg = document.createElement('img');
    currentImg.className = 'gallery-current';
    currentImg.src = '/img/proyecto-dc/foto-1.webp';
    currentImg.loading = 'lazy';
    viewer.appendChild(currentImg);

    // Flecha anterior
    const arrowPrev = document.createElement('button');
    arrowPrev.className = 'gallery-arrow prev';
    arrowPrev.innerHTML = '&#10094;';
    viewer.appendChild(arrowPrev);

    // Flecha siguiente
    const arrowNext = document.createElement('button');
    arrowNext.className = 'gallery-arrow next';
    arrowNext.innerHTML = '&#10095;';
    viewer.appendChild(arrowNext);

    let currentIndex = 0;

    // Miniaturas
    for (let i = 1; i <= total; i++) {

      const thumb = document.createElement('img');
      thumb.className = 'thumb';
      thumb.src = `/img/proyecto-dc/foto-${i}.webp`;
      thumb.loading = 'lazy';
      thumb.dataset.index = i - 1;

      if (i === 1) {
        thumb.classList.add('selected');
      }

      thumbnailsContainer.appendChild(thumb);
    }

    const thumbs = thumbnailsContainer.querySelectorAll('.thumb');

    function updateImage(index) {

      currentImg.src = `/img/proyecto-dc/foto-${index + 1}.webp`;

      thumbs.forEach(thumb => thumb.classList.remove('selected'));
      thumbs[index].classList.add('selected');

      currentIndex = index;

      preloadNext(index);
    }

    function preloadNext(index) {
      const nextIndex = index + 1;

      if (nextIndex < total) {
        const preload = new Image();
        preload.src = `/img/proyecto-dc/foto-${nextIndex + 1}.webp`;
      }
    }

    arrowNext.addEventListener('click', () => {
      updateImage((currentIndex + 1) % total);
    });

    arrowPrev.addEventListener('click', () => {
      updateImage((currentIndex - 1 + total) % total);
    });

    thumbs.forEach((thumb, index) => {
      thumb.addEventListener('click', () => updateImage(index));
    });

    preloadNext(0);
  }

});