const AppareilFilterSection = createFilterSection(
  "left-[296px]",
  "Appareils",
  "left-[438px]",
  "AppareilSearch",
  "searchApparei",
  "list_Appareil"
);

sectionOption.insertAdjacentHTML("beforeend", AppareilFilterSection);
waitForElements(".appareil", "list_Appareil", "Appareils", ".Appareils");

searcheInbtn("AppareilSearch", ".Appareils");
initializeButtons(".Appareils");

 
// /**
//  * return[close tag]
// //  */
// function closeAppareilTag() {
//   const tagElementsAppareil = document.querySelectorAll(".tagElementAppareil");

//   tagElementsAppareil.forEach((tagElementAppareil) => {
//     const btnCloseTagAppareil =
//       tagElementAppareil.querySelector(".closeTagAppareil");
//     const tagValueToRemoveAppareil = btnCloseTagAppareil.getAttribute(
//       "data-tag-value-Appareil"
//     );

//     btnCloseTagAppareil.addEventListener("click", function () {
//       console.log("Tag to remove:", tagValueToRemoveAppareil);
//       tagElementAppareil.remove();

//       // Retirez la valeur du tag du tableau elementValues
//       elementAppareilValues = elementAppareilValues.filter(
//         (value) => value !== tagValueToRemoveAppareil
//       );

//       updateAppareilList();

//       // Vérifie s'il ne reste plus aucun tag, puis affiche toutes les recettes
//       if (elementAppareilValues.length === 0) {
//         searchWithTagsAppareil([]);
//       } else {
//         searchWithTagsAppareil(elementAppareilValues);
//       }
//       updateNumberOfCards();
//     });
//   });
// }

// function searchWithTagsAppareil(tagValuesAppareil) {
//   const tagValueAppareil = tagValuesAppareil.map((value) =>
//     value.toLowerCase()
//   );
//   const cadresRecettes = document.querySelectorAll(".cadre");
//   // Vérifie si tous les tags ont été supprimés
//   console.log("tagValuUstensilese.length  ", tagValueAppareil.length);
//   const allTagsRemoved = tagValueAppareil.length < 0;

//   cadresRecettes.forEach((cadre) => {
//     const Appareil = cadre.querySelector(".appareil").textContent.toLowerCase();

//     // Vérifie que tout les tags présents dans la recette
//     const allTagsInRecipe = tagValueAppareil.every((tag) =>
//       Appareil.includes(tag)
//     );
//     console.log("tagValueAppareil.length ", tagValueAppareil.length);

//     if (allTagsRemoved || allTagsInRecipe) {
//       cadre.style.display = "block"; // Affiche le cadre de recette
//     } else {
//       cadre.style.display = "none"; // Masque le cadre de recette
//     }
//   });

//   // Si aucun tag n'a été supprimé, conserve l'état précédent de l'affichage
//   if (!allTagsRemoved) {
//     updateAppareilList();
//   }
// }

// // /**
// //  * @return[Ingedients List]
// //  */
// function updateAppareilList() {
//   waitForAppareil().then((AppareilElements) => {
//     const uniqueAppareil = new Set();
//     AppareilElements.forEach((element) => {
//       uniqueAppareil.add(element.textContent);
//     });
//     // Créez une nouvelle liste sans doublons à partir de l'ensemble
//     const uniqueAppareilElements = Array.from(uniqueAppareil);
//     // Supprimez  tout les éléments  de la liste des ingrédients
//     const AppareilChoix = document.getElementById("list_Appareil");
//     AppareilChoix.innerHTML = "";
//     // Affichez la nouvelle liste sans doublons
//     uniqueAppareilElements.forEach((element) => {
//       const ListAppareil = ` <li
//         class="Ustensiles  text-sm font-Manrope font-normal hover:bg-yellow-500 mb-2 py-4 pl-[18px] text-transform: capitalize" >
//           <button value="${element}" class="ListAppareilBtn ">  ${element} </button>
//         </li>`;
//       AppareilChoix.insertAdjacentHTML("beforeEnd", ListAppareil);
//     });
//     initializeAppareilButtons();
//   });
// }
