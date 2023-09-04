/**
 * @return[data]
 *
 */
const fetchData = async () => {
  try {
    const requete = await fetch("../public/recipes.json", {
      method: "GET",
    });
    if (requete.ok) {
      const data = await requete.json();
      console.log(data);
      return data;
    }
  } catch (e) {
    console.log(e);
  }
};

/**
 * @return[all data]
 * @return[reverse.dataArray]
 */
async function processRecipes() {
  const dataArray = await fetchData();
  dataArray.reverse();
  dataArray.forEach((data) => {
    card(data);
    displayIngredientsList(data);
  });
}

processRecipes();

function displayIngredientsList(data) {
  console.log(data.)
  const { ingredients } = data;
  /**
   * ingredientsbtn
   * @param[data ]
   * * @return[ingredientChoix]
   */
  const ingredientsbtn = ingredients.map(
    (ingr) => `
<li
 class="text-sm font-Manrope font-normal hover:bg-yellow-500 mb-2 py-4 pl-[18px] text-transform: capitalize">
${ingr.ingredient}
 </li>`
  );
  const ingredientChoix = document.getElementById("list_ingredient");
  ingredientChoix.insertAdjacentHTML("beforeEnd", ingredientsbtn);
}

/**
 * ingredientsbtn
 * @param[data ]
 * * @return[cadres]
 */
function card(data) {
  const { name, description, quantity, unit, ingredients, image, time } = data;
  const picture = `./assets/images/${image}`;

  //

  // Créer une liste d'ingrédients en parcourant le tableau d'ingrédients
  const ingredientsList = ingredients
    .map(
      (ingr) => `
 <li>
   <p>${ingr.ingredient}</p>
   ${
     ingr.quantity
       ? `<p class="text-slate-400 	tracking-widest	">${ingr.quantity} ${
           ingr.unit || ""
         }</p>`
       : ""
   }
 </li>
`
    )
    .join("");

  const maxLength = 180; // Le nombre maximal de caractères que vous souhaitez afficher

  // Tronquer la description si elle dépasse maxLength
  const truncatedDescription =
    description.length > maxLength
      ? `${description.substring(0, maxLength)}...` // Tronquer et ajouter des points de suspension
      : description;
  //
  const cadre = `
    <figure class="cadre  w-[380px] h-[731] bg-white rounded-3xl">  
    <div class="h-[253px] w-full rounded-3xl">
    <img  class="h-full w-full object-cover rounded-3xl rounded-b-lg" src="${picture}" alt="recette de ${name}">
    <p class="relative w-[80px] bg-yellow-500  text-center h-7 rounded-3xl 	top-[-232px]  left-[291px]"> ${time} min </p>
    </div>
    <div class="flex flex-col py-7 w-4/5 mx-auto gap-4">
    <h1 class="font-anton text-lg font-normal "> ${name} </h1>
    <p class="text-slate-400 font-bold	tracking-widest	">RECETTE</p>
    <figcaption> ${truncatedDescription} </figcaption>
    <div class="">
    <p class="text-slate-400 font-bold	tracking-widest	uppercase pb-3"> Ingrédients </p>

    <ul class="grid  grid-cols-2 mx-auto gap-7">
      ${ingredientsList}
    </ul>
  </div>
  </div>
    </figure>
    `;

  document.getElementById("cards").insertAdjacentHTML("afterbegin", cadre);
}

fetchData();
