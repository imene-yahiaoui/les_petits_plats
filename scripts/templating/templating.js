/**
 * ingredientsbtn
 * @param[data ]
 * @return[cadres]
 *@return[cader count]
 **/

function card(data) {
  const {
    name,
    description,
    quantity,
    unit,
    ingredients,
    image,
    time,
    id,
    appliance,
    ustensils
     
  } = data;
  const picture = `./assets/images/${image}`;

  // Créer une liste d'ingrédients en parcourant le tableau d'ingrédients
  const ingredientsList = ingredients
  ? ingredients
      .map(
        (ingr) => `
   <li>
     <p class="ingredientElement">${ingr.ingredient}</p>
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
    .join(""):"";

  const maxLength = 180;

  // Tronquer la description si elle dépasse maxLength
  const truncatedDescription =
    description.length > maxLength
      ? `${description.substring(0, maxLength)}...` // Tronquer et ajouter des points de suspension
      : description;

  // Récupérer les ustensiles dans un tableau
  const ustensilsList = [];
  ustensils.forEach((ustensil) => {
    ustensilsList.push(ustensil);
  });
  let ustensilsElement = null;
  for (let i = 0; i < ustensilsList.length; i++) {
    ustensilsElement = `<li class='Ustensile '>${ustensilsList[i]} </li>`;
  }
  const cadre = `
      <figure class="cadre  w-[380px] h-[731] bg-white rounded-3xl  " id="${id}" style='display: block;'>  
      <div class="h-[253px] w-full rounded-3xl" >
      <img  class="h-full w-full object-cover rounded-3xl rounded-b-lg" src="${picture}" alt="recette de ${name}">
      <p class="relative w-[80px] bg-yellow-500  text-center h-7 rounded-3xl 	top-[-232px]  left-[291px]"> ${time} min </p>
      </div>
      <div class="flex flex-col py-7 w-4/5 mx-auto gap-4">
      <h1 class="font-anton text-lg font-normal titlesCadre"> ${name} </h1>
      <p class="text-slate-400 font-bold	tracking-widest	">RECETTE</p>
      <figcaption class="descriptionCadre"> ${truncatedDescription} </figcaption>
      <div class="">
      <p class="text-slate-400 font-bold	tracking-widest	uppercase pb-3"> Ingrédients </p>
  
      <ul class="grid  grid-cols-2 mx-auto gap-7 ingredientsCard">
        ${ingredientsList}
      </ul>
     
    </div>
    </div>

    <p class="appareil  hidden" > ${appliance}  </p>
    <ul class="Ustensiles hidden" > ${ustensilsElement} 
     </ul>  
     

   
      </figure>
      `;

  return cadre;
}

function rendreCardCount(nbCadre) {
  return `
    <p class="font-Anton  text-[21px] font-normal" id="cardesNumber"> ${nbCadre}  recettes</p>
    `;
}

function createFilterSection(
  left,
  label,
  leftIcon,
  searchInputId,
  searchButtonId,
  listId
) {
  return `
    <div class="h-14 w-48 bg-white mb-16 cursor-pointer max-h-[324px] rounded-lg m-0">
      <input aria-label="checkbox" type="checkbox"
             class="h-20 w-60 peer inset-x-0 opacity-0 z-10 cursor-pointer relative z-2">
      <h1 class="absolute top-[16px] ${left} text-base font-medium font-Manrope">${label}</h1>
      <i class="fa-solid fa-chevron-down absolute top-[20px] ${leftIcon} transition-transform duration-500 rotate-0 peer-checked:rotate-180"></i>

      <div class="bg-white w-48  overflow-hidden transition-all duration-500 max-h-0 peer-checked:max-h-[315px] z-10 absolute top-[47px] rounded-lg pt-[12px]">
        <form class="w-40 h-[37px] display:block relative border-solid border-2 border-gray-400 mx-auto">
          <input type="search" aria-label="input" id="${searchInputId}" class="capitalize w-4/5 h-full focus:outline-none text-gray-400">
          <button id="${searchButtonId}" class="absolute top-[2px] right-2" aria-label="search" type="submit">
            <i class="fa-solid fa-magnifying-glass text-sm text-gray-400"></i>
          </button>
        </form>

        <ul id="${listId}" class="pt-4 max-h-60 overflow-y-auto"></ul>
      </div>
    </div>
  `;
}

///recuprer les elemntent des list
function ListItem(element, item) {
  return ` <li
          class="capitalize ${element}   text-sm font-Manrope font-normal hover:bg-yellow-500 mb-2 py-4 pl-[18px] " >
            <button class="ListIngredientsBtn ">  ${item} </button>
          </li>`;
}

function Tag(tag, closeTag, dataValue, valueBtn) {
  return `<li
  class="${tag}  text-sm font-Manrope font-normal bg-yellow-500 mb-2 py-4   text-transform: capitalize flex row px-4   rounded-md mr-10" >
   <p class="pr-14">  ${valueBtn}  </p>
   <button class="font-bold ${closeTag}" ${dataValue}="${valueBtn}"> <i class="fa-solid fa-x"></i> </button>
  </li>`;
}

function NoMatchCard(value) {
  return`<p id="NoMatchview" class="font-anton text-lg font-normal w-full py-10  bg-gray-200 pl-[60px]">  Aucune recette ne contient ‘${value} ’ vous pouvez chercher «
  tarte aux pommes », « poisson », etc. </p>`
}