document.addEventListener('DOMContentLoaded', () => {
  const dialog = document.querySelector('dialog');
  const galleryGrid = document.querySelector(".gallery-grid");
  const seeMoreBtn = document.getElementById("see-more");
  const seeLessBtn = document.getElementById("see-less");
  let index = 0;
  const maxVisible = 12;
  let isExpanded = false;

  fetch('gallery_fnac.json')
    .then(response => response.json())
    .then(dataGallery => {
      const closeButton = dialog.querySelector(".close");
      const iconLeftElement = document.getElementById("left-arrow");
      const iconRightElement = document.getElementById("right-arrow");
      const figure = dialog.querySelector("figure");

      const updateDialogContent = (index) => {
        figure.innerHTML = '';

        const imgFigure = document.createElement("img");
        imgFigure.src = dataGallery[index].src;

        // const figcaption = document.createElement("figcaption");
        // figcaption.innerText = dataGallery[index].figcaption;

        figure.appendChild(imgFigure);
        // figure.appendChild(figcaption);
      };

      const changeImageDirection = (direction) => {
        if (direction === "left") {
          index = (index > 0) ? index - 1 : dataGallery.length - 1;
        } else if (direction === "right") {
          index = (index < dataGallery.length - 1) ? index + 1 : 0;
        }
        updateDialogContent(index);
      };

      iconLeftElement.onclick = () => changeImageDirection("left");
      iconRightElement.onclick = () => changeImageDirection("right");

      document.addEventListener("keydown", (e) => {
        if (!dialog.open) return;
        if (e.key === "ArrowLeft") changeImageDirection("left");
        if (e.key === "ArrowRight") changeImageDirection("right");
      });

      const renderGallery = () => {
        galleryGrid.innerHTML = "";
        const visibleItems = isExpanded ? dataGallery : dataGallery.slice(0, maxVisible);

        visibleItems.forEach((item, i) => {
          const gridItemElement = document.createElement("div");
          gridItemElement.className = "grid-item";

          const imageElement = document.createElement("img");
          imageElement.id = `event-${item.id}`;
          imageElement.src = item.src;
          imageElement.alt = item.alt;
          imageElement.setAttribute("loading", "lazy");

          imageElement.addEventListener("click", () => {
            index = i;
            updateDialogContent(index);

            if (!document.body.contains(dialog)) {
              document.body.appendChild(dialog);
            }

            dialog.showModal();
          });

          gridItemElement.appendChild(imageElement);
          galleryGrid.appendChild(gridItemElement);
        });

        seeMoreBtn.style.display = isExpanded || dataGallery.length <= maxVisible ? "none" : "inline-block";
        seeLessBtn.style.display = isExpanded ? "inline-block" : "none";
      };

      closeButton.addEventListener("click", () => dialog.close());

      dialog.addEventListener("click", (e) => {
        if (e.target === dialog) dialog.close();
      });

      seeMoreBtn.addEventListener("click", () => {
        isExpanded = true;
        renderGallery();
      });

      seeLessBtn.addEventListener("click", () => {
        isExpanded = false;
        renderGallery();
      });

      renderGallery();
    })
    .catch(error => console.error('Error loading gallery:', error));
});
