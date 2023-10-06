/**
 * @param {data}
 * @return {recipe card}
 *
 */

const originalCadres = [];
const listOfGlobalRecipe = [];
let cadreCount = 0;
processRecipes();
/**
 * empêche le comportement par défaut du bouton lorsqu'il est cliqué
 */
BtnSearche.addEventListener("click", (e) => {
  e.preventDefault();
});

/**
 * recuper les card
 */

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
/**
 * affiche le numbre des recettes
 */
function numbreOfCard() {
  pageObject.addCard(rendreCardCount(cadreCount));
}

/**
 * metre a jour le numbre des recettes
 */

function updateNumberOfCards() {
  const numberOfVisibleCadres = pageObject.visibleCadres().length;

  pageObject.sectionFiltreNumber().innerHTML = rendreCardCount(
    numberOfVisibleCadres
  );
}

/**
 * Écoute les clics sur l'élément input
 */

searchValue.addEventListener("input", SearchWithInput);
function SearchWithInput() {
  performSearch(elementValues);
}
/**
 * aplique le filtrage dinput et tags
 */
function performSearch(tagValues) {
  const tagValue = tagValues.map((value) => value.toLowerCase());
  const valeurDeRecherche = searchValue.value.toLowerCase();
  const existingNoMatchMessage = document.getElementById("NoMatchview");

  if (existingNoMatchMessage) {
    existingNoMatchMessage.remove();
  }
  const matchCadres = [];

  filtre(valeurDeRecherche, matchCadres, listOfGlobalRecipe, tagValue);
  pageObject.cadre().innerHTML = "";
  /**
   *Affiche les cartes après le filtrage.
   */
  MatchCadre(valeurDeRecherche, matchCadres);
  filterAndDisplayCadres(valeurDeRecherche);
  /**
   * L'affichage  s'il n'y a pas de cartes correspondant à la recherche.
   */
  NoMatchCardes(valeurDeRecherche, matchCadres);

  updateNumberOfCards();
  updateIngredientsList();
  updateAppareilList();
  updateUstensileList();
}
/**
 * L'affichage  s'il n'y a pas de cartes correspondant à la recherche.
 */

function NoMatchCardes(valeurDeRecherche, matchCadres) {
  if (valeurDeRecherche.length > 2 && matchCadres.length === 0) {
    main.insertAdjacentHTML("afterend", NoMatchCard(valeurDeRecherche));
  }
}
