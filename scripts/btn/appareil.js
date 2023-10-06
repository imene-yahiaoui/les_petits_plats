/**
 * cree le btn  Appareil
 */
const AppareilFilterSection = createFilterSection(
  "left-[296px]",
  "Appareils",
  "left-[438px]",
  "AppareilSearch",
  "searchApparei",
  "list_Appareil"
);
pageObject.DisplaySection(AppareilFilterSection);

/**
 * affiche la list  des Appareils
 */
waitForElements(
  ".appareil",
  "list_Appareil",
  "Appareils",
  ".Appareils",
  "tagAppareils",
  "closeAppareils",
  "data-tag-value-Appareils"
);
/**
 * @param {input search }
 * @return {List Appareil}
 */
searcheInbtn("AppareilSearch", ".Appareils");
/**
 * @param {btn }
 * @return {value btn appareil}
 * crée le tags
 */
initializeButtons(
  ".Appareils",
  "tagAppareils",
  "closeAppareils",
  "data-tag-value-Appareils"
);
/**
 * @param {tagElement}
 * ferme le tag
 */
function closeBtnTagAppareil() {
  pageObject.tagElementsAppareils().forEach((tagElement) => {
    const btnCloseTag = tagElement.querySelector(".closeAppareils");
    const tagValueToRemove = btnCloseTag.getAttribute(
      "data-tag-value-Appareils"
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
      updateAppareilList();
      /**
       * Vérifie s'il ne reste plus aucun tag, puis affiche toutes les recettes
       */
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
 * @return {Appareils List}
 */
function updateAppareilList() {
  const elements = [];

  pageObject.visibleCadres().forEach((cadre) => {
    const elementsInCadre = cadre.querySelectorAll(".appareil");
    elements.push(...elementsInCadre);
  });

  const uniqueIngredients = new Set();
  elements.forEach((element) => {
    uniqueIngredients.add(element.textContent);
  });

  /**
   *Crée une nouvelle liste sans doublons à partir de l'ensemble
   */ const uniqueIngredientElements = Array.from(uniqueIngredients);

  /**
   *Efface la liste existante des ingrédients
   */
  pageObject.ingredientChoixAppareils().innerHTML = "";

  /**
   *Affiche la nouvelle liste sans doublons
   */
  uniqueIngredientElements.forEach((element) => {
    pageObject
      .ingredientChoixAppareils()
      .insertAdjacentHTML("beforeEnd", ListItem("Appareils", element));
  });

  /**
   * Initialise les boutons ou effectue toute autre action nécessaire
   */
  initializeButtons(
    ".Appareils",
    "tagAppareils",
    "closeAppareils",
    "data-tag-value-Appareils"
  );
}

/**
 * empêche le comportement par défaut du bouton lorsqu'il est cliqué
 */
const BtnsearchApparei = document.getElementById("searchApparei");
BtnsearchApparei.addEventListener("click", (e) => {
  e.preventDefault();
});
