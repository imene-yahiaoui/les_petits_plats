const sectionOption = document.getElementById("sectionoption");
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
sectionOption.insertAdjacentHTML("afterbegin", CreatIngredientFiltre);


 
function waitForIngredients() {
  return new Promise((resolve) => {
    const checkIngredients = () => {
      const ingredientElements = document.querySelectorAll('.ingredientElement');
      if (ingredientElements.length > 0) {
        resolve(ingredientElements);
      } else {
        setTimeout(checkIngredients, 100); // Vérifie a nouveau dans 100 ms
      }
    };
    checkIngredients();
  });
}

waitForIngredients().then((ingredientElements) => {
  const uniqueIngredients = new Set();
  ingredientElements.forEach((element) => {
    uniqueIngredients.add(element.textContent);
  
  });
  // Créez une nouvelle liste sans doublons à partir de l'ensemble
const uniqueIngredientElements = Array.from(uniqueIngredients);
// Affichez la nouvelle liste sans doublons 
uniqueIngredientElements.forEach((element) => {
  const ListIngredients =
  ` <li
  class="Ingredients  text-sm font-Manrope font-normal hover:bg-yellow-500 mb-2 py-4 pl-[18px] text-transform: capitalize" >
    <button value="${element}" class="ListIngredientsBtn ">  ${element} </button>
  </li>`;
     const ingredientChoix = document.getElementById("list_ingredient");
     ingredientChoix.insertAdjacentHTML("beforeEnd", ListIngredients);

  console.log(element);})
});
