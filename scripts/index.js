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

//////////////////recherche////////////
searchValue.addEventListener("input", SeracheWithInput);

function SeracheWithInput() {
  const valeurDeRecherche = searchValue.value.toLowerCase();
  performSearch(valeurDeRecherche);
}

function performSearch(valeurDeRecherche) {
  const existingNoMatchMessage = document.getElementById("NoMatchview");
  const cadresRecettes = pageObject.visibleCadres();
  const matchCadres = [];
  if (existingNoMatchMessage) {
    existingNoMatchMessage.remove();
  }
console.log('tagSection.length',tagSection.length)
  cadresRecettes.forEach((cadre) => {
    const titre = cadre.querySelector(".titlesCadre").textContent.toLowerCase();

    const description = cadre
      .querySelector(".descriptionCadre")
      .textContent.toLowerCase();
    const ingredients = cadre
      .querySelector(".ingredientsCard")
      .textContent.toLowerCase();

    if (
      titre.includes(valeurDeRecherche) ||
      description.includes(valeurDeRecherche) ||
      ingredients.includes(valeurDeRecherche)
    ) {
      matchCadres.push(cadre);
    }
  });
  pageObject.cadre().innerHTML = "";
  if (valeurDeRecherche.length > 2) {
    matchCadres.forEach((cadre) => {
      pageObject.cadre().appendChild(cadre);
    });
  } else if (valeurDeRecherche.length <= 2 ) {
    
    originalCadres.forEach((cadre) => {
      pageObject.DisplayCard(cadre);
    });
  }

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

BtnSearche.addEventListener("click", (e) => {
  e.preventDefault();
});
