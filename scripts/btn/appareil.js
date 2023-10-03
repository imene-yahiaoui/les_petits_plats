const AppareilFilterSection = createFilterSection(
  "left-[296px]",
  "Appareils",
  "left-[438px]",
  "AppareilSearch",
  "searchApparei",
  "list_Appareil"
);
pageObject.DisplaySection(AppareilFilterSection);

waitForElements(
  ".appareil",
  "list_Appareil",
  "Appareils",
  ".Appareils",
  "tagAppareils",
  "closeAppareils",
  "data-tag-value-Appareils"
);

searcheInbtn("AppareilSearch", ".Appareils");
initializeButtons(
  ".Appareils",
  "tagAppareils",
  "closeAppareils",
  "data-tag-value-Appareils"
);

function closeBtnTagAppareil() {
  pageObject.tagElementsAppareils().forEach((tagElement) => {
    const btnCloseTag = tagElement.querySelector(".closeAppareils");
    const tagValueToRemove = btnCloseTag.getAttribute(
      "data-tag-value-Appareils"
    );

    btnCloseTag.addEventListener("click", function () {
      tagElement.remove();

      // Retirez la valeur du tag du tableau elementValues
      elementValues = elementValues.filter(
        (value) => value !== tagValueToRemove
      );
      updateAppareilList();

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

  // Create a new list without duplicates from the set
  const uniqueIngredientElements = Array.from(uniqueIngredients);

  // Clear the existing list of ingredients
  pageObject.ingredientChoixAppareils().innerHTML = "";

  // Display the new list without duplicates
  uniqueIngredientElements.forEach((element) => {
    pageObject
      .ingredientChoixAppareils()
      .insertAdjacentHTML("beforeEnd", ListItem("Appareils", element));
  });

  // Initialize buttons or perform any other necessary actions
  initializeButtons(
    ".Appareils",
    "tagAppareils",
    "closeAppareils",
    "data-tag-value-Appareils"
  );
}
// Empêche le comportement par défaut du bouton
const BtnsearchApparei = document.getElementById("searchApparei");
BtnsearchApparei.addEventListener("click", (e) => {
  e.preventDefault();
});
