const galleryGrid = document.querySelector(".gallery-grid");
const dialog = document.querySelector("dialog");
let index = 0;

fetch('gallery.json')
  .then(response => response.json())
  .then(dataGallery => {

    dataGallery.forEach(item => {

      const gridItemElement = document.createElement("div");
      gridItemElement.className = "grid-item";

      const imageElement = document.createElement("img");
      imageElement.id = `event-${item.id}`;
      imageElement.src = item.src;
      imageElement.alt = item.alt;
      imageElement.setAttribute("loading", "lazy");

      // temporary for alt and figcaption change
      // const tempFigCaptionElement = document.createElement("p");
      // tempFigCaptionElement.innerText = `figcaption: ${item.figcaption}`;
      // gridItemElement.appendChild(tempFigCaptionElement);

      // const tempAltElement = document.createElement("p");
      // tempAltElement.innerText = `alt: ${item.alt}`;
      // gridItemElement.appendChild(tempAltElement);

      imageElement.addEventListener("click", () => {
        const dataItem = dataGallery.find(item => {
          return `event-${item.id}` === imageElement.id;
        })

        const figure = dialog.querySelector("figure");
        figure.innerHTML = '';

        const imgFigure = document.createElement("img");
        imgFigure.src = dataItem.src;
        figure.appendChild(imgFigure);

        // en gros nexiste pe pas, donc faut verifier avant?
        const figcaption = document.createElement("figcaption");
        figcaption.innerText = dataItem.figcaption;
        figure.appendChild(figcaption);

        const iconLeftElement = document.getElementById("left-arrow");
        const iconRightElement = document.getElementById("right-arrow");

        const changeImageDirection = (direction) => {
          if (direction === "left") {
            index = (index > 0) ? index - 1 : dataGallery.length - 1;
          } else if (direction === "right") {
            index = (index < dataGallery.length - 1) ? index + 1 : 0;
          }

          const newDataItem = dataGallery[index];
          imgFigure.src = newDataItem.src;
          figcaption.innerText = newDataItem.figcaption;
        }

        iconLeftElement.addEventListener("click", () => changeImageDirection("left"));
        iconRightElement.addEventListener("click", () => changeImageDirection("right"));

        document.addEventListener("keydown", (e) => {
          if (e.key === "ArrowLeft") {
            changeImageDirection("left");
          } else if (e.key === "ArrowRight") {
            changeImageDirection("right");
          }
        });

        dialog.showModal();
      });

      gridItemElement.appendChild(imageElement);
      galleryGrid.appendChild(gridItemElement);

      const closeButton = document.querySelector("dialog .close");

      const closeDialog = () => dialog.close();

      closeButton.addEventListener("click", closeDialog);

      document.querySelector('body').addEventListener("click", (e) => {
        if (e.target === dialog) {
          closeDialog();
        }
      });
    });
  })
  .catch(error => console.error('Error loading gallery:', error));
