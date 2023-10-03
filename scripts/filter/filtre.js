function filtre(
  valeurDeRecherche,
  matchCadres,
  listFiltre,
  tagValue,
  elementValues
) {
  listFiltre.forEach((cadre) => {
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
    // voir si il ya la valure dinput dans titre ou Description ou  Ingredients
    const containsValue =
      valeurDeRechercheInTitle ||
      valeurDeRechercheInDescription ||
      valeurDeRechercheInIngredients;
    //voir si il ya tag dans titre ou Description ou  Ingredients ou Appareil ou ustensils
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
    console.log("///////////////////containsValue", containsValue);
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
      console.log("la je suis dans valure0 et il ya un tag");
      if (allTagsInRecipe) {
        console.log("je confirme  il ya un tag");
        matchCadres.push(cadre);
      }
    }
  });

  console.log("matchCadres:", matchCadres);
}
//si la valure de rechreche moins de 2 caractères
function filterAndDisplayCadres(valeurDeRecherche) {
  if (valeurDeRecherche.length <= 2 && elementValues.length === 0) {
    // Effacez le contenu actuel de l'affichage des cadres
    pageObject.cadre().innerHTML = "";

    originalCadres.forEach((cadre) => {
      // const cadreElement = card(cadre);
      pageObject.DisplayCard(cadre);
    });
  }
}

// Filtrer les cadres en fonction de la valeur de recherche si elle est plus de 2  caractères
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
    console.log("matchCadre", matchCadres.length);
    console.log("matchCadre", matchCadres);
    // Effacez le contenu actuel de l'affichage des cadres
    pageObject.cadre().innerHTML = "";
    //l'affichage des cadres
    filteredCadres.forEach((recipe) => {
      const cadre = card(recipe);
      pageObject.DisplayCard(cadre);
    });
  }
}

// L'affichage s'il n'y a pas de carte correspondant à la recherche
function NoMatchCardes(valeurDeRecherche, matchCadres) {
  if (valeurDeRecherche.length > 2 && matchCadres.length === 0) {
    main.insertAdjacentHTML("afterend", NoMatchCard(valeurDeRecherche));
  }
}
