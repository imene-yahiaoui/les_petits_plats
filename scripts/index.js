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

//whit boucle for

// function performSearch(valeurDeRecherche) {
//   const existingNoMatchMessage = document.getElementById("NoMatchview");
//   const existingTag = document.getElementById("tags");
//   const cadresRecettes = pageObject.visibleCadres();
//   const matchCadres = [];

//   // Supprimer un message existant s'il y en a
//   if (existingNoMatchMessage) {
//     existingNoMatchMessage.remove();
//   }

//   // Utiliser une boucle for pour parcourir les cadres de recettes visibles
//   for (let i = 0; i < cadresRecettes.length; i++) {
//     const cadre = cadresRecettes[i];
//     const titre = cadre.querySelector(".titlesCadre").textContent.toLowerCase();
//     const description = cadre.querySelector(".descriptionCadre").textContent.toLowerCase();
//     const ingredients = cadre.querySelector(".ingredientsCard").textContent.toLowerCase();

//     // Vérifier si la valeur de recherche est présente dans le titre, la description ou les ingrédients
//     if (
//       titre.includes(valeurDeRecherche) ||
//       description.includes(valeurDeRecherche) ||
//       ingredients.includes(valeurDeRecherche)
//     ) {
//       matchCadres.push(cadre);
//     }
//   }

//   // Effacer le contenu actuel de l'affichage des cadres
//   pageObject.cadre().innerHTML = "";

//   // Filtrer les cadres en fonction de la valeur de recherche si elle est plus de 2 caractères
//   if (valeurDeRecherche.length > 2) {
//     for (let i = 0; i < matchCadres.length; i++) {
//       pageObject.cadre().appendChild(matchCadres[i]);
//     }
//   }

//   // Gérer le cas où la valeur de recherche est courte (<= 2 caractères) il retourne la liste originale
//   if (valeurDeRecherche.length <= 2) {
//     if (existingTag) {
//       elementValues = [];
//       tagSection.innerHTML = "";
//     }
//     for (let i = 0; i < originalCadres.length; i++) {
//       pageObject.DisplayCard(originalCadres[i]);
//     }
//   }

//   // Gérer le cas où aucun résultat n'est trouvé
//   if (valeurDeRecherche.length > 2 && matchCadres.length === 0) {
//     console.log("le resu est 0", valeurDeRecherche.length);
//     searchValue.value = "";
//     main.insertAdjacentHTML("afterend", NoMatchCard(valeurDeRecherche));
//   }

//   updateNumberOfCards();
//   updateIngredientsList();
//   updateAppareilList();
//   updateUstensileList();
// }
