/**
 * Effectue le filtrage des recettes en fonction de la valeur de recherche, des tags, et des éléments sélectionnés.
 * @param {string} valeurDeRecherche - La valeur de recherche de l'utilisateur.
 * @param {Array} matchCadres - Tableau pour stocker les recettes correspondantes.
 * @param {Array} listOfGlobalRecipe - Liste complète de recettes.
 * @param {string} tagValue - La valeur de tags sélectionné.
 * @param {Array} elementValues - Tableau contenant les tags sélectionnés.
 */

function filtre(
  valeurDeRecherche,
  matchCadres,
  listOfGlobalRecipe,
  tagValue,
  elementValues
) {
  for (let i = 0; i < listOfGlobalRecipe.length; i++) {
    const cadre = listOfGlobalRecipe[i];
    const titre = cadre.name.toLowerCase();
    const description = cadre.description.toLowerCase();
    const ingredients = cadre.ingredients;
    const Appareil = cadre.appliance.toLowerCase();
    const ustensils = cadre.ustensils;
    const valeurDeRechercheLowerCase = valeurDeRecherche.toLowerCase();
    const valeurDeRechercheInTitle = titre.includes(valeurDeRechercheLowerCase);
    const valeurDeRechercheInDescription = description.includes(
      valeurDeRechercheLowerCase
    );

    const valeurDeRechercheInIngredients =
      ingredients &&
      ingredients.some((ingr) =>
        ingr.ingredient.toLowerCase().includes(valeurDeRechercheLowerCase)
      );

    const containsValue =
      valeurDeRechercheInTitle ||
      valeurDeRechercheInDescription ||
      valeurDeRechercheInIngredients;

    const allTagsInRecipe = tagValue?.every(
      (tag) =>
        titre.includes(tag) ||
        description.includes(tag) ||
        (ingredients &&
          ingredients?.some((ingr) =>
            ingr.ingredient.toLowerCase().includes(tag)
          )) ||
        Appareil.includes(tag) ||
        (ustensils &&
          ustensils?.some((ustensil) => ustensil.toLowerCase().includes(tag)))
    );

    if (valeurDeRecherche.length > 2) {
      if (tagValue.length === 0) {
        if (containsValue) {
          matchCadres.push(cadre);
        }
      } else {
        if (containsValue && allTagsInRecipe) {
          matchCadres.push(cadre);
        }
      }
    } else if (
      !valeurDeRecherche ||
      (valeurDeRecherche.length <= 2 && tagValue?.length > 0)
    ) {
      if (allTagsInRecipe) {
        matchCadres.push(cadre);
      }
    }
  }
}
/**
 * afficher les cadres lorsque la valeur de recherche > 2 caractères et les tags ne sont pas  sélectionnés.
 * @param {string} valeurDeRecherche - La valeur de recherche de l'utilisateur.
 */
function filterAndDisplayCadres(valeurDeRecherche) {
  if (valeurDeRecherche.length <= 2 && elementValues.length === 0) {
    // Effacez le contenu actuel de l'affichage des cadres
    pageObject.cadre().innerHTML = "";

    for (let i = 0; i < originalCadres.length; i++) {
      const cadre = originalCadres[i];
      pageObject.DisplayCard(cadre);
    }
  }
}

/**
 * Afficher les cadres correspondants à la recherche.
 * @param {string} valeurDeRecherche - La valeur de recherche de l'utilisateur.
 * @param {Array} matchCadres - Tableau contenant les recettes correspondantes.
 */

function MatchCadre(valeurDeRecherche, matchCadres) {
  if (valeurDeRecherche.length > 2 || elementValues.length > 0) {
    const uniqueIds = new Set();
    // Filtrer les cadres en fonction de l'ID unique
    const filteredCadres = [];
    for (let i = 0; i < matchCadres.length; i++) {
      const recipe = matchCadres[i];
      const id = recipe.id;
      if (!uniqueIds.has(id)) {
        uniqueIds.add(id);
        filteredCadres.push(recipe);
      }
    }

    pageObject.cadre().innerHTML = "";

    for (let i = 0; i < filteredCadres.length; i++) {
      const cadre = card(filteredCadres[i]);
      pageObject.DisplayCard(cadre);
    }
  }
}
