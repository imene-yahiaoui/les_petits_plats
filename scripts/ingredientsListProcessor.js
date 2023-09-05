const valueIngredient = document.getElementById("ingredient");
const ingredientItems = document.querySelectorAll(".ListIngredientsBtn");

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

    //supriston de double
    const uniqueIngredients = [];
    const seenWords = new Set();

    for (const word of allIngredients) {
      if (!seenWords.has(word)) {
        uniqueIngredients.push(word);
        seenWords.add(word);
      }
    }

    for (let count = 0; count < uniqueIngredients.length; count++) {
      const ListIngredients = `
      <li
   class="Ingredients  text-sm font-Manrope font-normal hover:bg-yellow-500 mb-2 py-4 pl-[18px] text-transform: capitalize" >
     <button value="${uniqueIngredients[count]}" class="ListIngredientsBtn">  ${uniqueIngredients[count]} </button>
   </li>`;
      const ingredientChoix = document.getElementById("list_ingredient");
      ingredientChoix.insertAdjacentHTML("beforeEnd", ListIngredients);
    }
  }
}

/**
 * @param[input search ]
 * * @return[List Ingredients]
 */

valueIngredient.addEventListener("input", function () {
  const valeur = valueIngredient.value.toLowerCase();
  if (valeur.length > 2) {
    const ingredientList = document.querySelectorAll(".ListIngredientsBtn");

    const uniqueIngredients = new Set();

    for (const ingredientItem of ingredientList) {
      const ingredientName = ingredientItem.value.toLowerCase();
      uniqueIngredients.add(ingredientName);
    }
    console.log("unique", uniqueIngredients);
    for (const ingredientItem of ingredientList) {
      const ingredientName = ingredientItem.value.toLowerCase();
      const listItem = ingredientItem.parentElement;

      if (ingredientName.includes(valeur)) {
        listItem.style.display = "block"; // Afficher l'élément si le nom correspond
      } else {
        listItem.style.display = "none"; // Masquer l'élément si le nom ne correspond pas
      }
    }
  }
});
