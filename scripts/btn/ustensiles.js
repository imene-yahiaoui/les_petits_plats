/**
 * crée le btn ustensile
 */
const ustensilesFilterSection = createFilterSection(
  "left-[580px]",
  "Ustensiles",
  "left-[721px]",
  "UstensilesSearch",
  "searchUstensiles",
  "list_Ustensiles"
);

pageObject.DisplaySection(ustensilesFilterSection);
/**
 * affiche la list  des ustensiles
 */
waitForElements(
  ".Ustensile",
  "list_Ustensiles",
  "Ustensiles",
  ".Ustensiles",
  "tagUstensile",
  "closeTagUstensile",
  "data-tag-value-Ustensile"
);
/**
 * @param {input search }
 * @return {List Ustensiles}
 */
searcheInbtn("UstensilesSearch", ".Ustensiles");
/**
 *@param {btn }
 *@return {value btn Ustensile}
 * crée le tags
 */
initializeButtons(
  ".Ustensiles",
  "tagUstensile",
  "closeTagUstensile",
  "data-tag-value-Ustensile"
);
/**
 * @param {tagElement}
 * ferme le tag
 */
function closeBtnTagUstensile() {
  pageObject.tagElementsUstensile().forEach((tagElement) => {
    const btnCloseTag = tagElement.querySelector(".closeTagUstensile");
    const tagValueToRemove = btnCloseTag.getAttribute(
      "data-tag-value-Ustensile"
    );
    console.log("Tag to remove:", tagValueToRemove);
    btnCloseTag.addEventListener("click", function () {
      console.log("je entend le click");
      console.log("Tag to remove:", tagValueToRemove);
      tagElement.remove();
      /**
       * Retire la valeur du tag du tableau elementValues
       */
      elementValues = elementValues.filter(
        (value) => value !== tagValueToRemove
      );
      updateUstensileList();
      if (elementValues.length === 0) {
        searchWithTags([]);
      } else {
        searchWithTags(elementValues);
      }
      updateNumberOfCards();
    });
  });
}

/**
 * @return {Ustensile List}
 */
function updateUstensileList() {
  const elements = [];

  pageObject.visibleCadres().forEach((cadre) => {
    const elementsInCadre = cadre.querySelectorAll(".Ustensile");
    elements.push(...elementsInCadre);
  });

  const uniqueIngredients = new Set();
  elements.forEach((element) => {
    uniqueIngredients.add(element.textContent);
  });

  /**
   *Crée une nouvelle liste sans doublons à partir de l'ensemble
   */
  const uniqueIngredientElements = Array.from(uniqueIngredients);

  /**
   *Efface la liste existante des ingrédients
   */
  pageObject.ingredientChoixUstensile().innerHTML = "";

  /**
   *Affiche la nouvelle liste sans doublons
   */
  uniqueIngredientElements.forEach((element) => {
    pageObject
      .ingredientChoixUstensile()
      .insertAdjacentHTML("beforeEnd", ListItem("Ustensiles", element));
  });

  /**
   * Initialise les boutons ou effectue toute autre action nécessaire
   */
  initializeButtons(
    ".Ustensiles",
    "tagUstensile",
    "closeTagUstensile",
    "data-tag-value-Ustensile"
  );
}

/**
 * empêche le comportement par défaut du bouton lorsqu'il est cliqué
 */
const BtnsearchUstensiles = document.getElementById("searchUstensiles");
BtnsearchUstensiles.addEventListener("click", (e) => {
  e.preventDefault();
});
