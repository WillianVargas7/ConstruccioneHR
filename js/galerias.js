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

        // Detectar automáticamente si hay una sola etapa
        const variasEtapas = Object.keys(GALERIA.etapas).length > 1;

        const ruta = variasEtapas
            ? `${GALERIA.basePath}/${etapa}/`
            : `${GALERIA.basePath}/`;

        let currentIndex = 0;

        let lightbox;
        let lightboxImg;
        let lightboxCounter;

        // Imagen principal
        const currentImg = document.createElement("img");
        currentImg.className = "gallery-current";
        currentImg.loading = "lazy";
        currentImg.src = `${ruta}foto-1.${GALERIA.extension}`;
        viewer.appendChild(currentImg);

        // Precargar la segunda imagen
        if (total > 1) {
            const preload = new Image();
            preload.src = `${ruta}foto-2.${GALERIA.extension}`;
        }

        // Contador
        const counter = document.createElement("div");
        counter.className = "gallery-counter";
        counter.textContent = `1 / ${total}`;
        viewer.appendChild(counter);

        // Crear Lightbox
        lightbox = document.createElement("div");
        lightbox.className = "lightbox";

        lightbox.innerHTML = `
        <span class="lightbox-close">&times;</span>

        <span class="lightbox-arrow lightbox-prev">&#10094;</span>

        <img>

        <span class="lightbox-arrow lightbox-next">&#10095;</span>

        <div class="lightbox-counter"></div>
        `;

        document.body.appendChild(lightbox);

        lightboxImg = lightbox.querySelector("img");
        lightboxCounter = lightbox.querySelector(".lightbox-counter");

        // Flechas
        const prev = document.createElement("button");
        prev.className = "gallery-arrow prev";
        prev.innerHTML = "&#10094;";

        const next = document.createElement("button");
        next.className = "gallery-arrow next";
        next.innerHTML = "&#10095;";

        viewer.append(prev, next);

        currentImg.style.cursor="zoom-in";

        currentImg.addEventListener("click",()=>{
            lightbox.classList.add("active");
            lightboxImg.src=currentImg.src;
            lightboxCounter.textContent=`${currentIndex+1} / ${total}`;
        });

        lightbox.querySelector(".lightbox-close")
        .addEventListener("click",()=>{

            lightbox.classList.remove("active");

        });

        lightbox.addEventListener("click",(e)=>{
            if(e.target===lightbox){
                lightbox.classList.remove("active");
            }
        });

        lightbox.querySelector(".lightbox-next")
        .addEventListener("click",()=>{
            actualizar((currentIndex+1)%total);
        });

        lightbox.querySelector(".lightbox-prev")
        .addEventListener("click",()=>{
            actualizar((currentIndex-1+total)%total);
        });

        // Miniaturas
        for (let i = 1; i <= total; i++) {

            const thumb = document.createElement("img");
            thumb.className = "thumb";
            thumb.loading = "lazy";
            thumb.src = `${ruta}foto-${i}.${GALERIA.extension}`;
            thumb.dataset.index = i - 1;

            if (i === 1) {
                thumb.classList.add("selected");
            }

            thumb.addEventListener("click", () => actualizar(i - 1));

            thumbsContainer.appendChild(thumb);
        }

        const thumbs = thumbsContainer.querySelectorAll(".thumb");

        function actualizar(index) {

            currentImg.style.opacity = "0";

            setTimeout(() => {

                currentImg.src = `${ruta}foto-${index + 1}.${GALERIA.extension}`;

                currentImg.onload = () => {
                    currentImg.style.opacity = "1";
                };

            }, 150);

            thumbs.forEach(thumb => thumb.classList.remove("selected"));
            thumbs[index].classList.add("selected");

            counter.textContent = `${index + 1} / ${total}`;

            thumbs[index].scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "nearest"
            });

            currentIndex = index;

            if(lightbox.classList.contains("active")){
                lightboxImg.src=currentImg.src;
                lightboxCounter.textContent=`${index+1} / ${total}`;
            }

            // Precargar imagen siguiente
            const siguiente = new Image();

            siguiente.src =
                `${ruta}foto-${((index + 1) % total) + 1}.${GALERIA.extension}`;

            // Precargar imagen anterior
            const anterior = new Image();

            anterior.src =
                `${ruta}foto-${((index - 1 + total) % total) + 1}.${GALERIA.extension}`;

        }

        next.addEventListener("click", () => {
            actualizar((currentIndex + 1) % total);
        });

        prev.addEventListener("click", () => {
            actualizar((currentIndex - 1 + total) % total);
        });
    }
});

document.addEventListener("keydown",(e)=>{

    if(!lightbox.classList.contains("active")) return;

    if(e.key==="Escape")
        lightbox.classList.remove("active");

    if(e.key==="ArrowRight")
        actualizar((currentIndex+1)%total);

    if(e.key==="ArrowLeft")
        actualizar((currentIndex-1+total)%total);

});