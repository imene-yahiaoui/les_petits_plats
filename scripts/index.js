/**
 * @param[data]
 * @return[recipe card]
 *
 */

const originalCadres = [];
const listOfGlobalRecipe = [];
let cadreCount = 0;
//recuper les card
async function processRecipes() {
  const dataArray = await fetchData();
  dataArray.forEach((data) => {
    listOfGlobalRecipe.push(data);
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

//metre a jour le numero de cardes
function updateNumberOfCards() {
  const numberOfVisibleCadres = pageObject.visibleCadres().length;

  pageObject.sectionFiltreNumber().innerHTML = rendreCardCount(
    numberOfVisibleCadres
  );
}

BtnSearche.addEventListener("click", (e) => {
  e.preventDefault();
});
//functin dinput
searchValue.addEventListener("input", SearchWithInput);
function SearchWithInput() {
  performSearch(elementValues);
}

function performSearch(tagValues) {
  const tagValue = tagValues.map((value) => value.toLowerCase());
  const valeurDeRecherche = searchValue.value.toLowerCase();
  const existingNoMatchMessage = document.getElementById("NoMatchview");

  // Supprimer un message existant s'il y en a
  if (existingNoMatchMessage) {
    existingNoMatchMessage.remove();
  }
  const matchCadres = [];

  filtre(valeurDeRecherche, matchCadres, listOfGlobalRecipe, tagValue);
  // Effacer le contenu actuel de l'affichage des cadres
  pageObject.cadre().innerHTML = "";
  ///affiche les card
  MatchCadre(valeurDeRecherche, matchCadres);
  filterAndDisplayCadres(valeurDeRecherche);
  //affiche msg derr
  NoMatchCardes(valeurDeRecherche, matchCadres);

  updateNumberOfCards();
  updateIngredientsList();
  updateAppareilList();
  updateUstensileList();
}
// L'affichage s'il n'y a pas de carte correspondant à la recherche
function NoMatchCardes(valeurDeRecherche, matchCadres) {
  if (valeurDeRecherche.length > 2 && matchCadres.length === 0) {
    main.insertAdjacentHTML("afterend", NoMatchCard(valeurDeRecherche));
  }
}
