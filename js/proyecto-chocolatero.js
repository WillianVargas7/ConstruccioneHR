document.addEventListener('DOMContentLoaded', () => {
  const etapas = {
    estructura: 2,
    obra: 11,
    acabados: 21,
    entrega: 2
  };

  Object.entries(etapas).forEach(([etapa, total]) => {
    crearGaleria(etapa, total);
  });

  function crearGaleria(etapa, total) {
    const viewer = document.querySelector(`.gallery-viewer[data-gallery="${etapa}"]`);
    const thumbnailsContainer = document.querySelector(`.thumbnails[data-gallery="${etapa}"]`);

    const currentImg = document.createElement('img');
    currentImg.className = 'gallery-current';
    currentImg.src = `/img/chocolatero/${etapa}/foto-1.jpg`;
    viewer.appendChild(currentImg);

    const arrowPrev = document.createElement('button');
    arrowPrev.className = 'gallery-arrow prev';
    arrowPrev.innerHTML = '&#10094;';
    arrowPrev.dataset.gallery = etapa;
    viewer.appendChild(arrowPrev);

    const arrowNext = document.createElement('button');
    arrowNext.className = 'gallery-arrow next';
    arrowNext.innerHTML = '&#10095;';
    arrowNext.dataset.gallery = etapa;
    viewer.appendChild(arrowNext);

    let currentIndex = 0;

    for (let i = 1; i <= total; i++) {
      const thumb = document.createElement('img');
      thumb.className = 'thumb';
      thumb.src = `/img/chocolatero/${etapa}/foto-${i}.jpg`;
      thumb.dataset.index = i - 1;
      if (i === 1) thumb.classList.add('selected');
      thumbnailsContainer.appendChild(thumb);
    }

    const thumbs = thumbnailsContainer.querySelectorAll('.thumb');

    function updateImage(index) {
      currentImg.src = `/img/chocolatero/${etapa}/foto-${index + 1}.jpg`;
      thumbs.forEach(thumb => thumb.classList.remove('selected'));
      thumbs[index].classList.add('selected');
      currentIndex = index;
    }

    arrowNext.addEventListener('click', () => {
      const next = (currentIndex + 1) % total;
      updateImage(next);
    });

    arrowPrev.addEventListener('click', () => {
      const prev = (currentIndex - 1 + total) % total;
      updateImage(prev);
    });

    thumbs.forEach((thumb, index) => {
      thumb.addEventListener('click', () => updateImage(index));
    });
  }
});
