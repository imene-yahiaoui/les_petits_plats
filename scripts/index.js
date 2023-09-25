/**
 * @return[data]
 *
 */
let cadreCount = 0;

async function processRecipes() {
  const dataArray = await fetchData();

  dataArray.reverse();
  dataArray.forEach((data) => {
    const cadre = card(data);
    cadreCount++;
    // pageObject.cadre().insertAdjacentHTML("afterbegin", cadre);
    pageObject.DisplayCard(cadre);
  });
  numbreOfCard();
}

function numbreOfCard() {
  // pageObject
  //   .sectionFiltre()
  //   .insertAdjacentHTML("beforeend", rendreCardCount(cadreCount));
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

//////////////////recherche////////////
searchValue.addEventListener("input", function () {
  const valeurDeRecherche = searchValue.value.toLowerCase();
  // Parcours les cadres de recette pour trouver correspondances
  const cadresRecettes = document.querySelectorAll(".cadre");
  cadresRecettes.forEach((cadre) => {
    const titre = cadre.querySelector(".titlesCadre").textContent.toLowerCase();

    const description = cadre
      .querySelector(".descriptionCadre")
      .textContent.toLowerCase();
    const ingredients = cadre
      .querySelector(".ingredientsCard")
      .textContent.toLowerCase();

    // Vérifie si la valeur de recherche est présente dans le titre, la description ou les ingrédients
    if (valeurDeRecherche.length > 2) {
      // Stocker la valeur de recherche dans le localStorage
      // localStorage.setItem("searchValue", valeurDeRecherche);
      if (
        titre.includes(valeurDeRecherche) ||
        description.includes(valeurDeRecherche) ||
        ingredients.includes(valeurDeRecherche)
      ) {
        cadre.style.display = "block"; // Affiche le cadre de recette
      } else {
        cadre.style.display = "none"; // Masque le cadre de recette
      }
    } else {
      cadre.style.display = "block";
    }
  });

  updateNumberOfCards();
  updateIngredientsList();
  updateAppareilList();
  updateUstensileList();
});

BtnSearche.addEventListener("click", (e) => {
  e.preventDefault();
});
