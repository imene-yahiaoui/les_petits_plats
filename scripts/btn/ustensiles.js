const ustensilesFilterSection = createFilterSection(
  "left-[580px]",
  "Ustensiles",
  "left-[721px]",
  "UstensilesSearch",
  "searchUstensiles",
  "list_Ustensiles"
);

pageObject.DisplaySection(ustensilesFilterSection);

waitForElements(
  ".Ustensile",
  "list_Ustensiles",
  "Ustensiles",
  ".Ustensiles",
  "tagUstensile",
  "closeTagUstensile",
  "data-tag-value-Ustensile"
);

searcheInbtn("UstensilesSearch", ".Ustensiles");
initializeButtons(
  ".Ustensiles",
  "tagUstensile",
  "closeTagUstensile",
  "data-tag-value-Ustensile"
);

function closeBtnTagUstensile() {
  pageObject.tagElementsUstensile().forEach((tagElement) => {
    const btnCloseTag = tagElement.querySelector(".closeTagUstensile");
    const tagValueToRemove = btnCloseTag.getAttribute(
      "data-tag-value-Ustensile"
    );

    btnCloseTag.addEventListener("click", function () {
      tagElement.remove();

      // Retirez la valeur du tag du tableau elementValues
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
 * @return[Ingedients List]
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

  // Create a new list without duplicates from the set
  const uniqueIngredientElements = Array.from(uniqueIngredients);

  // Clear the existing list of ingredients
  pageObject.ingredientChoixUstensile().innerHTML = "";

  // Display the new list without duplicates
  uniqueIngredientElements.forEach((element) => {
    pageObject
      .ingredientChoixUstensile()
      .insertAdjacentHTML("beforeEnd", ListItem("Ustensiles", element));
  });

  // Initialize buttons or perform any other necessary actions
  initializeButtons(
    ".Ustensiles",
    "tagUstensile",
    "closeTagUstensile",
    "data-tag-value-Ustensile"
  );
}
// Empêche le comportement par défaut du bouton
const BtnsearchUstensiles = document.getElementById("searchUstensiles");
BtnsearchUstensiles.addEventListener("click", (e) => {
  e.preventDefault();
});
