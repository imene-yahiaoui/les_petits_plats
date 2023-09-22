
/**
 * @return[data]
 *
 */
let cadreCount = 0;

/**
 * @return[data]
 * @return[reverse.dataArray]
 *  @return[dataArrayLength]
 */

async function processRecipes() {
  const dataArray = await fetchData();

  dataArray.reverse();
  dataArray.forEach((data) => {
    const cadre = card(data);
    cadreCount++;
    document.getElementById("cards").insertAdjacentHTML("afterbegin", cadre);
  });
  numbreOfCard();
}

function numbreOfCard() {
  const sectionFiltre = document.getElementById("sectionFiltre");
  sectionFiltre.insertAdjacentHTML("beforeend", rendreCardCount(cadreCount));
}
processRecipes();
fetchData();

//metre a jour le numero de cardes
function updateNumberOfCards() {
  const visibleCadres = document.querySelectorAll(
    ".cadre[style='display: block;']"
  );
  const numberOfVisibleCadres = visibleCadres.length;
  const sectionFiltre = document.getElementById("cardesNumber");
  sectionFiltre.innerHTML = rendreCardCount(numberOfVisibleCadres)
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
      localStorage.setItem("searchValue", valeurDeRecherche);
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
      localStorage.removeItem("searchValue");
      console.log("jai enlver de locale");
      // Mettez à jour elementValues en retirant la valeur de recherche
      elementValues = elementValues.filter(
        (value) => value === valeurDeRecherche
      );
      console.log("je suprime ici ", elementValues);
      //ici jai un probleme
      // updateElementValuesFromLocalStorage()
      const tagElements = document.querySelectorAll(".tagElement");
      if (tagElements.length === 0) {
        cadre.style.display = "block"; // Affiche le cadre de recette
      } else {
        initializeIngredientButtons();
        initializeAppareilButtons();
      }
    }
  });

  updateAppareilList(); ///Mettre à jour la list des appareill
  updateIngedientsList(); // Mettre à jour la list des ingedients
  updateNumberOfCards(); // Mettre à jour le nombre de cadres visibles
});

BtnSearche.addEventListener("click", (e) => {
  e.preventDefault();
});

// Supprimer les données du localStorage avant le rafraîchissement de la page
window.addEventListener("beforeunload", () => {
  const valeurDeRecherche = searchValue.value.toLowerCase();
  localStorage.removeItem("searchValue");
});
