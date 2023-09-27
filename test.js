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
  // const cadresRecettes = document.querySelectorAll(".cadre");
  const cadresRecettes = pageObject.visibleCadres();
  cadresRecettes.forEach((cadre) => {
    const titre = cadre.querySelector(".titlesCadre").textContent.toLowerCase();

    const description = cadre
      .querySelector(".descriptionCadre")
      .textContent.toLowerCase();
    const ingredients = cadre
      .querySelector(".ingredientsCard")
      .textContent.toLowerCase();
    console.log(valeurDeRecherche.length);
    // Vérifie si la valeur de recherche est présente dans le titre, la description ou les ingrédients
    if (valeurDeRecherche.length > 2) {
      if (
        titre.includes(valeurDeRecherche) ||
        description.includes(valeurDeRecherche) ||
        ingredients.includes(valeurDeRecherche)
      ) {
        cadre.style.display = "block";
      } else {
        // cadre.remove();
        cadre.style.display = "none";
      }
    } else {
      // pageObject.cadre().innerHTML ="";
      // originalCadres.forEach((cadre)=>{
      //   pageObject.DisplayCard(cadre)
      // })
      cadre.style.display = "block";
    }
  });

  if (valeurDeRecherche.length <= 2) {
    pageObject.cadre().innerHTML = "";
    originalCadres.forEach((cadre) => {
      pageObject.DisplayCard(cadre);
    });
    // cadre.style.display = "block"
  }
  updateNumberOfCards();
  updateIngredientsList();
  updateAppareilList();
  updateUstensileList();
}
BtnSearche.addEventListener("click", (e) => {
  e.preventDefault();
});
//////////////////recherche////////////
