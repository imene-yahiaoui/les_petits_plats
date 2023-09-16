let dataArrayLength = 0;
/**
 * @return[data]
 *
 */
let cadreCount = 0;
const fetchData = async () => {
  try {
    const requete = await fetch("../public/recipes.json", {
      method: "GET",
    });
    if (requete.ok) {
      const data = await requete.json();

      return data;
    }
  } catch (e) {
    console.log(e);
  }
};

/**
 * @return[data]
 * @return[reverse.dataArray]
 *  @return[dataArrayLength]
 */

async function processRecipes() {
  const dataArray = await fetchData();
  dataArrayLength = dataArray.length;

  dataArray.reverse();
  dataArray.forEach((data) => {
    card(data);
  });
  numbreOfCard();
}
processRecipes();

/**
 * ingredientsbtn
 * @param[data ]
 * @return[cadres]
 *@return[cader count]
 **/

function card(data) {
  const { name, description, quantity, unit, ingredients, image, time, id } =
    data;
  const picture = `./assets/images/${image}`;

  // Créer une liste d'ingrédients en parcourant le tableau d'ingrédients
  const ingredientsList = ingredients
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
    .join("");

  const maxLength = 180;

  // Tronquer la description si elle dépasse maxLength
  const truncatedDescription =
    description.length > maxLength
      ? `${description.substring(0, maxLength)}...` // Tronquer et ajouter des points de suspension
      : description;
  //
  const cadre = `
    <figure class="cadre  w-[380px] h-[731] bg-white rounded-3xl  " id="${id}" style='display: block;'>  
    <div class="h-[253px] w-full rounded-3xl">
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
    </figure>
    `;

  document.getElementById("cards").insertAdjacentHTML("afterbegin", cadre);
  cadreCount++;
}

function numbreOfCard() {
  const sectionFiltre = document.getElementById("sectionFiltre");

  const recipenumbre = `
  <p class="font-Anton  text-[21px] font-normal" id="cardesNumber"> ${cadreCount}  recettes</p>
  `;
  sectionFiltre.insertAdjacentHTML("beforeend", recipenumbre);
}

fetchData();

//metre a jour le numero de cardes
function updateNumberOfCards() {
  const visibleCadres = document.querySelectorAll(
    ".cadre[style='display: block;']"
  );
  const numberOfVisibleCadres = visibleCadres.length;
  const sectionFiltre = document.getElementById("cardesNumber");

  const recipenumbre = `
    <p class="font-Anton text-[21px] font-normal">${numberOfVisibleCadres} recettes</p>
  `;
  sectionFiltre.innerHTML = recipenumbre;
}

// Récupère la valeur de recherche
const searchValue = document.getElementById("searche");
const titlesCadre = document.querySelectorAll(".titlesCadre");
const ingredientsCard = document.querySelectorAll(".ingredientsCard");
const descriptionCadre = document.querySelectorAll(".descriptionCadre");

searchValue.addEventListener("input", function () {
  const valeurDeRecherche = searchValue.value.toLowerCase();
  // Parcours les cadres de recette pour trouver correspondances
  const cadresRecettes = document.querySelectorAll(".cadre");
  cadresRecettes.forEach((cadre) => {
    const titre = cadre.querySelector(".titlesCadre").textContent.toLowerCase();
    const description = cadre
      .querySelector(".descriptionCadre")
      .textContent.toLowerCase();
    const ingredients = cadre
      .querySelector(".ingredientsCard")
      .textContent.toLowerCase();

    // Vérifie si la valeur de recherche est présente dans le titre, la description ou les ingrédients
    if (valeurDeRecherche.length > 2) {
      if (
        titre.includes(valeurDeRecherche) ||
        description.includes(valeurDeRecherche) ||
        ingredients.includes(valeurDeRecherche)
      ) {
        cadre.style.display = "block"; // Affiche le cadre de recette
      } else {
        cadre.style.display = "none"; // Masque le cadre de recette
      }
    } else {
      cadre.style.display = "block"; // Affiche le cadre de recette
    }
  });
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

});
