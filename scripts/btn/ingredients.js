 
const ingredientsFilterSection = createFilterSection(
  "left-[19px]",
  "Ingrédients",
  "left-[150px]",
  "ingredientSearch",
  "searchIngredient",
  "list_ingredient"
);

sectionOption.insertAdjacentHTML("afterbegin", ingredientsFilterSection);
waitForElements(".ingredientElement", "list_ingredient", "Ingredients",".Ingredients");
searcheInbtn("ingredientSearch", ".Ingredients");
// initializeButtons(".Ingredients","tagIngredients","closeTagIngredients","data-tag-value-Ingredients");
initializeButtons(".Ingredients", "tagIngredients", "closeTagIngredients", "data-tag-value-Ingredients");
 closeTag("tagIngredients","closeTagIngredients","data-tag-value-Ingredients")

 

// //try
// // Fonction pour mettre à jour elementValues à partir du localStorage
// function updateElementValuesFromLocalStorage() {
//   if (localStorage !== null) {
//     const searchValue = localStorage.getItem("searchValue");
//     if (searchValue) {
//       // Assurez-vous que la valeur n'est pas déjà présente dans elementValues
//       if (!elementValues.includes(searchValue)) {
//         elementValues.push(searchValue);
//       }
//     } else {
//       elementValues = elementValues.filter((value) => value !== searchValue);
//     }
//   }
// }

// /**
//  * return[close tag]
//  */
// function closeTag() {
//   const tagElements = document.querySelectorAll(".tagElement");

//   tagElements.forEach((tagElement) => {
//     const btnCloseTag = tagElement.querySelector(".closeTag");
//     const tagValueToRemove = btnCloseTag.getAttribute("data-tag-value");

//     btnCloseTag.addEventListener("click", function () {
//       console.log("Tag to remove:", tagValueToRemove);
//       tagElement.remove();

//       // Retirez la valeur du tag du tableau elementValues
//       elementValues = elementValues.filter(
//         (value) => value !== tagValueToRemove
//       );

//       updateIngedientsList();

//       // Vérifie s'il ne reste plus aucun tag, puis affiche toutes les recettes
//       if (elementValues.length === 0) {
//         searchWithTags([]);
//       } else {
//         searchWithTags(elementValues);
//       }
//       updateNumberOfCards();
//     });
//   });
// }

// /**
//  * @return[ searche whith tags]
//  */
// //if input est la

// // const searchValue = document.getElementById("searche");
// // const valeurDeRecherche = searchValue.value.toLowerCase();

// function searchWithTags(tagValues) {
//   const tagValue = tagValues.map((value) => value.toLowerCase());
//   const cadresRecettes = document.querySelectorAll(".cadre");
//   // Vérifie si tous les tags ont été supprimés
//   console.log("tagValue.length 1 ", tagValue.length);
//   const allTagsRemoved = tagValue.length < 0;

//   cadresRecettes.forEach((cadre) => {
//     const titre = cadre.querySelector(".titlesCadre").textContent.toLowerCase();
//     const description = cadre
//       .querySelector(".descriptionCadre")
//       .textContent.toLowerCase();
//     const ingredients = cadre
//       .querySelector(".ingredientsCard")
//       .textContent.toLowerCase();

//     // Vérifie que tout les tags présents dans la recette
//     const allTagsInRecipe = tagValue.every(
//       (tag) =>
//         titre.includes(tag) ||
//         description.includes(tag) ||
//         ingredients.includes(tag)
//     );
//     console.log("tagValue.length ", tagValue.length);

//     if (allTagsRemoved || allTagsInRecipe) {
//       cadre.style.display = "block"; // Affiche le cadre de recette
//     } else {
//       cadre.style.display = "none"; // Masque le cadre de recette
//     }
//   });

//   // Si aucun tag n'a été supprimé, conserve l'état précédent de l'affichage
//   if (!allTagsRemoved) {
//     updateIngedientsList();
//   }
// }

// /**
//  * @return[Ingedients List]
//  */
// function updateIngedientsList() {
//   waitForIngredients().then((ingredientElements) => {
//     const uniqueIngredients = new Set();
//     ingredientElements.forEach((element) => {
//       uniqueIngredients.add(element.textContent);
//     });
//     // Créez une nouvelle liste sans doublons à partir de l'ensemble
//     const uniqueIngredientElements = Array.from(uniqueIngredients);
//     // Supprimez  tout les éléments  de la liste des ingrédients
//     const ingredientChoix = document.getElementById("list_ingredient");
//     ingredientChoix.innerHTML = "";
//     // Affichez la nouvelle liste sans doublons
//     uniqueIngredientElements.forEach((element) => {
//       const ListIngredients = ` <li
//       class="Ingredients  text-sm font-Manrope font-normal hover:bg-yellow-500 mb-2 py-4 pl-[18px] text-transform: capitalize" >
//         <button value="${element}" class="ListIngredientsBtn ">  ${element} </button>
//       </li>`;
//       ingredientChoix.insertAdjacentHTML("beforeEnd", ListIngredients);
//     });
//     initializeIngredientButtons();
//   });
// }
