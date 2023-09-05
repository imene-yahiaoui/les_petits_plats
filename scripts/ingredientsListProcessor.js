/**
 * @param[data ]
 * * @return[List Ingredients]
 */

const allIngredientsbtn = [];
const allIngredients = [];
for (let i = 0; i < 50; i++) {
  function displayIngredientsList(data) {
    const { ingredients } = data;

    const ingredientsbtn = ingredients.map((ingr) => ingr.ingredient);

    // Ajoutez chaque tableau ingredientsbtn au tableau allIngredientsbtn
    allIngredientsbtn.push(ingredientsbtn);

    //recupere tout les allIngredientsbtn dans un seul tableau
    const allIngredients = allIngredientsbtn.reduce(
      (acc, currentArray) => acc.concat(currentArray),
      []
    );
    console.log(allIngredients);
    //supriston de double
    const uniqueIngredients = [];
    const seenWords = new Set();

    for (const word of allIngredients) {
      if (!seenWords.has(word)) {
        uniqueIngredients.push(word);
        seenWords.add(word);
      }
    }

    console.log("uniqueIngredients", uniqueIngredients);

    for (let count = 0; count < uniqueIngredients.length; count++) {
      const ListIngredients = `<li
   class="text-sm font-Manrope font-normal hover:bg-yellow-500 mb-2 py-4 pl-[18px] text-transform: capitalize">
  ${uniqueIngredients[count]}
   </li>`;
      const ingredientChoix = document.getElementById("list_ingredient");
      ingredientChoix.insertAdjacentHTML("beforeEnd", ListIngredients);
    }
  }
}
