document.addEventListener("DOMContentLoaded", () => {

    if (typeof GALERIA === "undefined") return;

    Object.entries(GALERIA.etapas).forEach(([etapa, total]) => {
        crearGaleria(etapa, total);
    });


    function crearGaleria(etapa, total) {

        const viewer = document.querySelector(
            `.gallery-viewer[data-gallery="${etapa}"]`
        );

        const thumbsContainer = document.querySelector(
            `.thumbnails[data-gallery="${etapa}"]`
        );

        if (!viewer || !thumbsContainer) return;


        let currentIndex = 0;


        const currentImg = document.createElement("img");

        currentImg.className = "gallery-current";

        currentImg.loading = "lazy";

        currentImg.src =
            `${GALERIA.basePath}/${etapa}/foto-1.${GALERIA.extension}`;

        viewer.appendChild(currentImg);


        const prev = document.createElement("button");
        prev.className = "gallery-arrow prev";
        prev.innerHTML = "&#10094;";

        const next = document.createElement("button");
        next.className = "gallery-arrow next";
        next.innerHTML = "&#10095;";

        viewer.append(prev, next);


        for (let i = 1; i <= total; i++) {

            const thumb = document.createElement("img");

            thumb.className = "thumb";

            thumb.loading = "lazy";

            thumb.src =
                `${GALERIA.basePath}/${etapa}/foto-${i}.${GALERIA.extension}`;

            thumb.dataset.index = i - 1;

            if (i === 1)
                thumb.classList.add("selected");

            thumb.addEventListener("click", () => {
                actualizar(i - 1);
            });

            thumbsContainer.appendChild(thumb);

        }


        const thumbs = thumbsContainer.querySelectorAll(".thumb");


        function actualizar(index) {

            currentImg.src =
                `${GALERIA.basePath}/${etapa}/foto-${index + 1}.${GALERIA.extension}`;

            thumbs.forEach(t => t.classList.remove("selected"));

            thumbs[index].classList.add("selected");

            currentIndex = index;

        }


        next.addEventListener("click", () => {
            actualizar((currentIndex + 1) % total);
        });


        prev.addEventListener("click", () => {
            actualizar((currentIndex - 1 + total) % total);
        });

    }

});