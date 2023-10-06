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
  listOfGlobalRecipe.forEach((cadre) => {
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
    /**
     * voir si il ya la valure dinput dans titre ou Description ou  Ingredients
     */

    const containsValue =
      valeurDeRechercheInTitle ||
      valeurDeRechercheInDescription ||
      valeurDeRechercheInIngredients;
    /**
     * voir si il ya tag dans titre ou Description ou  Ingredients ou Appareil ou ustensils
     */

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
      /**
       *si ya pas tag
       */

      if (tagValue.length === 0) {
        if (containsValue) {
          matchCadres.push(cadre);
        }
        /**
         *si il ya tag
         */
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
  });
}
/**
 * afficher les cadres lorsque la valeur de recherche a moins de 3 caractères et des tags sont pas  sélectionnés.
 * @param {string} valeurDeRecherche - La valeur de recherche de l'utilisateur.
 */

function filterAndDisplayCadres(valeurDeRecherche) {
  if (valeurDeRecherche.length <= 2 && elementValues.length === 0) {
    pageObject.cadre().innerHTML = "";

    originalCadres.forEach((cadre) => {
      pageObject.DisplayCard(cadre);
    });
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
    const filteredCadres = matchCadres.filter((recipe) => {
      const id = recipe.id;
      if (!uniqueIds.has(id)) {
        uniqueIds.add(id);
        return true;
      }
      return false;
    });
    /**
     * Effacez le contenu actuel de l'affichage des cadres
     */

    pageObject.cadre().innerHTML = "";
    /**
     * l'affichage des cadres
     */
    filteredCadres.forEach((recipe) => {
      const cadre = card(recipe);
      pageObject.DisplayCard(cadre);
    });
  }
}
