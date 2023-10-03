const ingredientsFilterSection = createFilterSection(
  "left-[19px]",
  "Ingrédients",
  "left-[150px]",
  "ingredientSearch",
  "searchIngredient",
  "list_ingredient"
);
pageObject.DisplaySection(ingredientsFilterSection);

waitForElements(
  ".ingredientElement",
  "list_ingredient",
  "Ingredients",
  ".Ingredients",
  "tagIngredients",
  "closeTagIngredients",
  "data-value-Ingredients"
);

searcheInbtn("ingredientSearch", ".Ingredients");

initializeButtons(
  ".Ingredients",
  "tagIngredients",
  "closeTagIngredients",
  "data-value-Ingredients"
);

function closeBtnTagIngredient() {
  pageObject.tagElements().forEach((tagElement) => {
    const btnCloseTag = tagElement.querySelector(".closeTagIngredients");
    const tagValueToRemove = btnCloseTag.getAttribute("data-value-Ingredients");

    btnCloseTag.addEventListener("click", function () {
      tagElement.remove();

      // Retirez la valeur du tag du tableau elementValues
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
 * @return[Ingedients List]
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

  // Create a new list without duplicates from the set
  const uniqueIngredientElements = Array.from(uniqueIngredients);

  // Clear the existing list of ingredients
  pageObject.ingredientChoix().innerHTML = "";

  // Display the new list without duplicates
  uniqueIngredientElements.forEach((element) => {
    pageObject
      .ingredientChoix()
      .insertAdjacentHTML("beforeEnd", ListItem("Ingredients", element));
  });

  // Initialize buttons or perform any other necessary actions
  initializeButtons(
    ".Ingredients",
    "tagIngredients",
    "closeTagIngredients",
    "data-value-Ingredients"
  );
}
// Empêche le comportement par défaut du bouton
const BtnsearchIngredient = document.getElementById("searchIngredient");
BtnsearchIngredient.addEventListener("click", (e) => {
  e.preventDefault();
});
