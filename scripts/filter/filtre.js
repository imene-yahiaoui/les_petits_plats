searchValue.addEventListener("input", SearchWithInput);
function SearchWithInput() {
  const valeurDeRecherche = searchValue.value.toLowerCase();
  //   matchCadres.length = 0;

  performSearch(valeurDeRecherche);
}
/**
 * @param[valeurDeRecherche]
 * @return[matchCadres]
 */
function performSearch(valeurDeRecherche) {
  const existingNoMatchMessage = document.getElementById("NoMatchview");
  const existingTag = document.getElementById("tags");

  // Supprimer un message existant s'il y en a
  if (existingNoMatchMessage) {
    existingNoMatchMessage.remove();
  }
  const matchCadres = [];
  filtre(valeurDeRecherche, matchCadres);
  // Effacer le contenu actuel de l'affichage des cadres
  pageObject.cadre().innerHTML = "";
  MatchCadre(valeurDeRecherche, matchCadres);
  filterAndDisplayCadres(valeurDeRecherche,existingTag);
  NoMatchCardes(valeurDeRecherche, matchCadres);

  updateNumberOfCards();
  updateIngredientsList();
  updateAppareilList();
  updateUstensileList();
}

function filtre(valeurDeRecherche, matchCadres) {
  console.log(valeurDeRecherche);
  matchCadres.length = 0;
  console.log(listFiltre.length);
  console.log(listFiltre);

  listFiltre.forEach((cadre) => {
    const titre = cadre.name; // Assurez-vous que la propriété name existe dans votre objet cadre
    const description = cadre.description; // Assurez-vous que la propriété description existe dans votre objet cadre
    const ingredients = cadre.ingredients.map((ingr) => ingr.ingredient); // Assurez-vous que la propriété ingredients existe dans votre objet cadre et qu'elle est un tableau

    if (
      titre.toLowerCase().includes(valeurDeRecherche) ||
      description.toLowerCase().includes(valeurDeRecherche) ||
      ingredients.some((ingr) => ingr.toLowerCase().includes(valeurDeRecherche))
    ) {
      matchCadres.push(cadre);
    }
  });
}

// Filtrer les cadres en fonction de la valeur de recherche si elle est plus de 2  caractères
function MatchCadre(valeurDeRecherche, matchCadres) {
  if (valeurDeRecherche.length > 2) {
    console.log("matchCadre", matchCadres.length);
    console.log("matchCadre", matchCadres);
    // Effacez le contenu actuel de l'affichage des cadres
    pageObject.cadre().innerHTML = "";

    matchCadres.forEach((recipe) => {
      const cadre = card(recipe);
      pageObject.DisplayCard(cadre);
    });
  }
}

// Gérer le cas où la valeur de recherche est courte (<= 2 caractères) il retourne la liste original
function filterAndDisplayCadres(valeurDeRecherche,existingTag) {
  if (valeurDeRecherche.length <= 2) {
    if (existingTag) {
      elementValues = [];
      tagSection.innerHTML = "";
    }
    originalCadres.forEach((cadre) => {
      pageObject.DisplayCard(cadre);
    });
  }
}
// Gérer le cas où aucun résultat n'est trouvé
function NoMatchCardes(valeurDeRecherche, matchCadres) {
  if (valeurDeRecherche.length > 2 && matchCadres.length === 0) {
    console.log("le resu est 0", valeurDeRecherche.length);
    main.insertAdjacentHTML("afterend", NoMatchCard(valeurDeRecherche));
  }
}
