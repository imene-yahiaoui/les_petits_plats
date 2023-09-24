const ingredientsFilterSection = createFilterSection(
  "left-[19px]",
  "Ingrédients",
  "left-[150px]",
  "ingredientSearch",
  "searchIngredient",
  "list_ingredient"
);

sectionOption.insertAdjacentHTML("afterbegin", ingredientsFilterSection);

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
  const tagElements = document.querySelectorAll(".tagIngredients");

  tagElements.forEach((tagElement) => {
    const btnCloseTag = tagElement.querySelector(".closeTagIngredients");
    const tagValueToRemove = btnCloseTag.getAttribute("data-value-Ingredients");
    console.log("Tag to remove:", tagValueToRemove);
    btnCloseTag.addEventListener("click", function () {
      console.log("je entend le click");
      console.log("Tag to remove:", tagValueToRemove);
      tagElement.remove();

      // Retirez la valeur du tag du tableau elementValues
      elementValues = elementValues.filter(
        (value) => value !== tagValueToRemove
      );

      updateIngredientsList();

      //  Vérifie s'il ne reste plus aucun tag, puis affiche toutes les recettes
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
  const visibleCadres = document.querySelectorAll(
    ".cadre[style='display: block;']"
  );
  const elements = [];

  visibleCadres.forEach((cadre) => {
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
  const ingredientChoix = document.getElementById("list_ingredient");
  ingredientChoix.innerHTML = "";

  // Display the new list without duplicates
  uniqueIngredientElements.forEach((element) => {
    ingredientChoix.insertAdjacentHTML(
      "beforeEnd",
      ListItem("Ingredients", element)
    );
  });

  // Initialize buttons or perform any other necessary actions
  initializeButtons(
    ".Ingredients",
    "tagIngredients",
    "closeTagIngredients",
    "data-value-Ingredients"
  );
}
