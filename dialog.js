const dialog = document.querySelector("dialog");
const itemList = Array.from(document.querySelectorAll(".grid-item img"));
const closeButton = document.querySelector("dialog .close");

// Le bouton "Afficher la fenêtre" ouvre le dialogue
// nodelist

itemList.forEach(gridItem => {
  gridItem.addEventListener("click", () => {

    // ici on cherche a récuperer la figure
    // on peut aussi recuperer un element directement en faisant son nom puis querySelector au lieu de rajouter document
    const figure = dialog.querySelector("figure")
    // ensuite on rajoute directement a l'intérieur en faisant innerHTML, puis on met directement l'HTML, et une interpolation pour la src, gridItem = image a l'interieur de grid-item, donc chaque image sa propre source
    figure.innerHTML = `<img src="${gridItem.src}" alt="">`

    dialog.showModal();
  });
});

// Le bouton "Fermer" ferme le dialogue
closeButton.addEventListener("click", () => {
  dialog.close();
});
