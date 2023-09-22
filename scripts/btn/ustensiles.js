const ustensilesFilterSection = createFilterSection(
  "left-[580px]",
  "Ustensiles",
  "left-[721px]",
  "UstensilesSearch",
  "searchUstensiles",
  "list_Ustensiles"
);

sectionOption.insertAdjacentHTML("beforeend", ustensilesFilterSection);

waitForElements(".Ustensile", "list_Ustensiles", "Ustensiles",".Ustensiles");

searcheInbtn("UstensilesSearch", ".Ustensiles");
initializeButtons(".Ustensiles");
 

// // //try
// // // Fonction pour mettre à jour elementValues à partir du localStorage
// // function updateElementValuesFromLocalStorage() {
// //   if (localStorage !== null) {
// //     const searchValue = localStorage.getItem("searchValue");
// //      if (searchValue) {
// //       // Assurez-vous que la valeur n'est pas déjà présente dans elementValues
// //       if (!elementValues.includes(searchValue)) {
// //         elementValues.push(searchValue);
// //       }
// //     }
// //     else {
// //         elementValues = elementValues.filter(value => value !== searchValue);
// //     }
// //    }
// // }

// // /**
// //  * return[close tag]
// //  */
// function closeTag() {
//   const tagElementsUstensiles = document.querySelectorAll(".tagElementUstensiles");

//   tagElementsUstensiles.forEach((tagElement) => {
//     const btnCloseTagUstensiles = tagElement.querySelector(".closeTagUstensiles");
//     const tagValueToRemove = btnCloseTagUstensiles.getAttribute("data-tag-value-Ustensiles");

//     btnCloseTagUstensiles.addEventListener("click", function () {
//       console.log("Tag to remove:", tagValueToRemove);
//       tagElement.remove();

//       // Retirez la valeur du tag du tableau elementValues
//       elementUstensilesValues = elementUstensilesValues.filter(
//         (value) => value !== tagValueToRemove
//       );

//     //   updateIngedientsList();

//       // Vérifie s'il ne reste plus aucun tag, puis affiche toutes les recettes
//       if (elementUstensilesValues.length === 0) {
//         searchWithTags([]);
//       } else {
//         searchWithTags(elementUstensilesValues);
//       }
//      updateNumberOfCards();
//     });
//   });
// }

// function searchWithTags(tagValuesUstensiles) {

//   const tagValueUstensiles = tagValuesUstensiles.map((value) => value.toLowerCase());
//   const cadresRecettes = document.querySelectorAll(".cadre");
//   // Vérifie si tous les tags ont été supprimés
//   console.log("tagValuUstensilese.length  ", tagValueUstensiles.length);
//   const allTagsRemoved = tagValueUstensiles.length < 0;

//   cadresRecettes.forEach((cadre) => {
//     const Ustensiles = cadre.querySelector(".Ustensiles").textContent.toLowerCase();

//     // Vérifie que tout les tags présents dans la recette
//     const allTagsInRecipe = tagValueUstensiles.every(
//       (tag) =>
//       Ustensiles.includes(tag)
//     );
//     console.log("tagValueUstensiles.length ", tagValueUstensiles.length);

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

// // /**
// //  * @return[Ingedients List]
// //  */
// function updateIngedientsList() {
//   waitForUstensiles().then((UstensilesElements) => {
//     const uniqueUstensiles = new Set();
//     UstensilesElements.forEach((element) => {
//       uniqueUstensiles.add(element.textContent);
//     });
//     // Créez une nouvelle liste sans doublons à partir de l'ensemble
//     const uniqueUstensilesElements = Array.from(uniqueUstensiles);
//     // Supprimez  tout les éléments  de la liste des ingrédients
//     const UstensilesChoix = document.getElementById("list_Ustensiles");
//     UstensilesChoix.innerHTML = "";
//     // Affichez la nouvelle liste sans doublons
//     uniqueUstensilesElements.forEach((element) => {
//       const ListUstensiles = ` <li
//       class="Ustensiles  text-sm font-Manrope font-normal hover:bg-yellow-500 mb-2 py-4 pl-[18px] text-transform: capitalize" >
//         <button value="${element}" class="ListUstensilesBtn ">  ${element} </button>
//       </li>`;
//       UstensilesChoix.insertAdjacentHTML("beforeEnd", ListUstensiles);
//     });
//     initializeUstensilesButtons();
//   });
// }
