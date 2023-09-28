/**
 * @return[data]
 *
 */

const originalCadres = [];

let cadreCount = 0;

async function processRecipes() {
  const dataArray = await fetchData();
  dataArray.reverse();
  dataArray.forEach((data) => {
    const cadre = card(data);
    cadreCount++;
    pageObject.DisplayCard(cadre);
    originalCadres.push(cadre);
  });
  numbreOfCard();
}

function numbreOfCard() {
  pageObject.addCard(rendreCardCount(cadreCount));
}
processRecipes();
fetchData();
let originalId = pageObject.cadre().getAttribute("data-id");
//metre a jour le numero de cardes
function updateNumberOfCards() {
  const numberOfVisibleCadres = pageObject.visibleCadres().length;

  pageObject.sectionFiltreNumber().innerHTML = rendreCardCount(
    numberOfVisibleCadres
  );
}

function SerachWithInput() {
  const valeurDeRecherche = searchValue.value.toLowerCase();
  performSearch(valeurDeRecherche);
}
/**
 * @param[valeurDeRecherche]
 * @return[matchCadres]
 */
function performSearch(valeurDeRecherche) {
  const existingNoMatchMessage = document.getElementById("NoMatchview");
  const existingTag = document.getElementById("tags");
  const cadresRecettes = pageObject.visibleCadres();
  const matchCadres = [];
  // Supprimer un message existant s'il y en a
  if (existingNoMatchMessage) {
    existingNoMatchMessage.remove();
  }
  console.log("tagSection.length", tagSection.length);
  // Parcourir les cadres de recettes visibles
  cadresRecettes.forEach((cadre) => {
    const titre = cadre.querySelector(".titlesCadre").textContent.toLowerCase();

    const description = cadre
      .querySelector(".descriptionCadre")
      .textContent.toLowerCase();
    const ingredients = cadre
      .querySelector(".ingredientsCard")
      .textContent.toLowerCase();
    // Vérifier si la valeur de recherche est présente dans le titre ou la description ou les ingrédients

    if (
      titre.includes(valeurDeRecherche) ||
      description.includes(valeurDeRecherche) ||
      ingredients.includes(valeurDeRecherche)
    ) {
      matchCadres.push(cadre);
    }
  });
  // Effacer le contenu actuel de l'affichage des cadres
  pageObject.cadre().innerHTML = "";

  // Filtrer les cadres en fonction de la valeur de recherche si elle est plus de 2  caractères
  if (valeurDeRecherche.length > 2) {
    matchCadres.forEach((cadre) => {
      pageObject.cadre().appendChild(cadre);
    });
  }
  // Gérer le cas où la valeur de recherche est courte (<= 2 caractères) il retourne la liste original
  if (valeurDeRecherche.length <= 2) {
    if (existingTag) {
      elementValues = [];
    }
    originalCadres.forEach((cadre) => {
      pageObject.DisplayCard(cadre);
    });
  }
  // Gérer le cas où aucun résultat n'est trouvé
  if (valeurDeRecherche.length > 2 && matchCadres.length === 0) {
    console.log("le resu est 0", valeurDeRecherche.length);
    searchValue.value = "";
    main.insertAdjacentHTML("afterend", NoMatchCard(valeurDeRecherche));
  }

  updateNumberOfCards();
  updateIngredientsList();
  updateAppareilList();
  updateUstensileList();
}

searchValue.addEventListener("input", SerachWithInput);

BtnSearche.addEventListener("click", (e) => {
  e.preventDefault();
});
