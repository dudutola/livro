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

      imageElement.addEventListener("click", () => {
        const dataItem = dataGallery.find(item => {
          return `event-${item.id}` === imageElement.id;
        })

        const figure = dialog.querySelector("figure");

        const imgFigure = document.createElement("img");
        imgFigure.src = dataItem.src;

        const iconLeftElement = document.createElement("button");
        iconLeftElement.innerText = "<";
        iconLeftElement.className = "arrow left-arrow";

        const iconRightElement = document.createElement("button");
        iconRightElement.innerText = ">";
        iconRightElement.className = "arrow right-arrow";

        figure.appendChild(imgFigure);

        const figcaption = dialog.querySelector("figcaption");
        figcaption.innerText = dataItem.figcaption;

        dialog.appendChild(iconLeftElement);
        dialog.appendChild(iconRightElement);

        const changeImageDirection = (direction) => {
          if (direction === "left") {
            index = (index > 0) ? index - 1 : dataGallery.length - 1;
          } else if (direction === "right") {
            index = (index < dataGallery.length - 1) ? index + 1 : 0;
          }

          const previousDataItem = dataGallery[index];
          imgFigure.src = previousDataItem.src;
          figcaption.innerText = previousDataItem.figcaption;
        }

        iconLeftElement.addEventListener("click", () => changeImageDirection("left"));
        iconRightElement.addEventListener("click", () => changeImageDirection("right"));

        dialog.showModal();
      });

      gridItemElement.appendChild(imageElement);
      galleryGrid.appendChild(gridItemElement);

      const closeButton = document.querySelector("dialog .close");

      closeButton.addEventListener("click", () => {
        dialog.close();
      });
    });
  })
  .catch(error => console.error('Error loading gallery:', error));
