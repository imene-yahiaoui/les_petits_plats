/**
 * @return[data]
 *
 */

const originalCadres = [];
const listFiltre = [];
let cadreCount = 0;

async function processRecipes() {
  const dataArray = await fetchData();
  dataArray.forEach((data) => {
    listFiltre.push(data);
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

