const sectionFiltre = document.getElementById("sectionFiltre");
const ingredientItems = document.querySelectorAll(".ListIngredientsBtn");

//add html brn CreatIngredientFiltre

const CreatIngredientFiltre = `
<div class="h-14 w-48 bg-white mb-16 cursor-pointer max-h-[324px] rounded-lg">
  <input aria-label="checkbox" type="checkbox"
         class="h-20 w-60 peer inset-x-0 opacity-0 z-10 cursor-pointer relative z-2">
  <h1 class="absolute top-[16px] left-[19px] text-base font-medium font-Manrope">Ingrédients</h1>
  <i class="fa-solid fa-chevron-down absolute top-[20px] left-[150px] transition-transform duration-500 rotate-0 peer-checked:rotate-180"></i>

  <div class="bg-white w-48  overflow-hidden transition-all duration-500 max-h-0 peer-checked:max-h-[315px] z-10 absolute top-[47px] rounded-lg pt-[12px]">
    <form class="w-40 h-[37px] display:block relative border-solid border-2 border-gray-400 mx-auto">
      <input type="search" aria-label="input ingredient" id="ingredient" class="w-4/5 h-full focus:outline-none text-gray-400 text-transform:capitalize">
      <button id="searchIngredient" class="absolute top-[2px] right-2" aria-label="search ingredient" type="submit">
        <i class="fa-solid fa-magnifying-glass text-sm text-gray-400"></i>
      </button>
    </form>

    <ul id="list_ingredient" class="pt-4 max-h-60 overflow-y-auto"></ul>
  </div>
</div>
`;
sectionFiltre.insertAdjacentHTML("afterbegin", CreatIngredientFiltre);

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
     <button value="${uniqueIngredients[count]}" class="ListIngredientsBtn ">  ${uniqueIngredients[count]} </button>
   </li>`;
      const ingredientChoix = document.getElementById("list_ingredient");
      ingredientChoix.insertAdjacentHTML("beforeEnd", ListIngredients);

      //code de click sur btn

      // const buttonIngredient = ingredientChoix.querySelector('.ListIngredientsBtn:last-child');
      // buttonIngredient.addEventListener('click', function(event) {
      //   const valeurDuBouton = event.target.value;
      //   console.log('Valeur du bouton :', valeurDuBouton);
      // });
    }
  }
}

/**
 * @param[input search ]
 * * @return[List Ingredients]
 */
const valueIngredient = document.getElementById("ingredient");

const displayedIngredients = new Set();

valueIngredient.addEventListener("input", function () {
  const valeur = valueIngredient.value.toLowerCase();
  const ingredientList = document.querySelectorAll(".ListIngredientsBtn");

  for (const ingredientItem of ingredientList) {
    const ingredientName = ingredientItem.value.toLowerCase();
    const listItem = ingredientItem.parentElement;

    if (valeur.length > 2) {
      if (
        ingredientName.includes(valeur) &&
        !displayedIngredients.has(ingredientName)
      ) {
        listItem.style.display = "block";
        displayedIngredients.add(ingredientName); // Ajoutez le nom à l'ensemble des noms affichés
      } else {
        listItem.style.display = "none"; // Masquer l'élément si le nom ne correspond pas
      }
    } else {
      listItem.style.display = "block";
    }
  }
});

//cree tage si en appuis sur un ingredient

// Sélectionnez tous les boutons avec la classe "ListIngredientsBtn"
