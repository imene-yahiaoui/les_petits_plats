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
      //si ya pas tag
      if (tagValue.length === 0) {
        if (containsValue) {
          matchCadres.push(cadre);
        }
        //si il ya tag
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

// Filtrer les cadres en fonction de la valeur de recherche si elle est plus de 2  caractères
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

    // Effacez le contenu actuel de l'affichage des cadres
    pageObject.cadre().innerHTML = "";

    for (let i = 0; i < filteredCadres.length; i++) {
      const cadre = card(filteredCadres[i]);
      pageObject.DisplayCard(cadre);
    }
  }
}

function NoMatchCardes(valeurDeRecherche, matchCadres) {
  if (valeurDeRecherche.length > 2 && matchCadres.length === 0) {
    main.insertAdjacentHTML("afterend", NoMatchCard(valeurDeRecherche));
  }
}
