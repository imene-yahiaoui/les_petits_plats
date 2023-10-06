/**
 * crée le btn ingredient
 */

const ingredientsFilterSection = createFilterSection(
  "left-[19px]",
  "Ingrédients",
  "left-[150px]",
  "ingredientSearch",
  "searchIngredient",
  "list_ingredient"
);
pageObject.DisplaySection(ingredientsFilterSection);
/**
 * affiche la list  des ingredients
 */
waitForElements(
  ".ingredientElement",
  "list_ingredient",
  "Ingredients",
  ".Ingredients",
  "tagIngredients",
  "closeTagIngredients",
  "data-value-Ingredients"
);
/**
 * @param {input search }
 * @return {List Ingredients}
 */
searcheInbtn("ingredientSearch", ".Ingredients");

/**
 * @param {btn }
 * @return { value btn ingredient}
 * crée le tags
 */
initializeButtons(
  ".Ingredients",
  "tagIngredients",
  "closeTagIngredients",
  "data-value-Ingredients"
);

/**
 * @param {tagElement}
 * ferme le tag
 */
function closeBtnTagIngredient() {
  pageObject.tagElements().forEach((tagElement) => {
    const btnCloseTag = tagElement.querySelector(".closeTagIngredients");
    const tagValueToRemove = btnCloseTag.getAttribute("data-value-Ingredients");
    console.log("Tag to remove:", tagValueToRemove);
    btnCloseTag.addEventListener("click", function () {
      console.log("Tag to remove:", tagValueToRemove);
      tagElement.remove();
      /**
       * Retire la valeur du tag du tableau elementValues
       */
      elementValues = elementValues.filter(
        (value) => value !== tagValueToRemove
      );
      updateIngredientsList();
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
 * @return {Ingedients List}
 */
function updateIngredientsList() {
  const elements = [];

  pageObject.visibleCadres().forEach((cadre) => {
    const elementsInCadre = cadre.querySelectorAll(".ingredientElement");
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

  pageObject.ingredientChoix().innerHTML = "";
  /**
   *Affiche la nouvelle liste sans doublons
   */

  uniqueIngredientElements.forEach((element) => {
    pageObject
      .ingredientChoix()
      .insertAdjacentHTML("beforeEnd", ListItem("Ingredients", element));
  });

  /**
   * Initialise les boutons ou effectue toute autre action nécessaire
   */
  initializeButtons(
    ".Ingredients",
    "tagIngredients",
    "closeTagIngredients",
    "data-value-Ingredients"
  );
}

/**
 * empêche le comportement par défaut du bouton lorsqu'il est cliqué
 */
const BtnsearchIngredient = document.getElementById("searchIngredient");
BtnsearchIngredient.addEventListener("click", (e) => {
  e.preventDefault();
});
