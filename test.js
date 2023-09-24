 // Mettre à jour la liste des ingrédients  
 waitForIngredients().then((ingredientElements) => {
    const uniqueIngredients = new Set();
    ingredientElements.forEach((element) => {
      uniqueIngredients.add(element.textContent);
    });
    // Créez une nouvelle liste sans doublons à partir de l'ensemble
    const uniqueIngredientElements = Array.from(uniqueIngredients);
    // Supprimez  tout les éléments  de la liste des ingrédients
    const ingredientChoix = document.getElementById("list_ingredient");
    ingredientChoix.innerHTML = "";
    // Affichez la nouvelle liste sans doublons
    uniqueIngredientElements.forEach((element) => {
      const ListIngredients = ` <li
      class="Ingredients  text-sm font-Manrope font-normal hover:bg-yellow-500 mb-2 py-4 pl-[18px] text-transform: capitalize" >
        <button value="${element}" class="ListIngredientsBtn ">  ${element} </button>
      </li>`;
      ingredientChoix.insertAdjacentHTML("beforeEnd", ListIngredients);
      console.log(element);
    });
  });
    updateNumberOfCards(); // Mettre à jour le nombre de cadres visibles

    
// waitForIngredients().then((ingredientElements) => {
//   const uniqueIngredients = new Set();
//   ingredientElements.forEach((element) => {
//     uniqueIngredients.add(element.textContent);
//   });
//   // Créez une nouvelle liste sans doublons à partir de l'ensemble
//   const uniqueIngredientElements = Array.from(uniqueIngredients);
//   // Affichez la nouvelle liste sans doublons
//   uniqueIngredientElements.forEach((element) => {

//     const ListIngredients = ` <li
//   class="capitalize Ingredients  text-sm font-Manrope font-normal hover:bg-yellow-500 mb-2 py-4 pl-[18px] " >
//     <button class="ListIngredientsBtn ">  ${element} </button>
//   </li>`;
//     const ingredientChoix = document.getElementById("list_ingredient");
//     ingredientChoix.insertAdjacentHTML("beforeEnd", ListIngredients);
//    console.log(element);
//   });
//   initializeIngredientButtons();
// });