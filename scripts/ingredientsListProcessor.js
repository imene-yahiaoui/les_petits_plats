const sectionOption = document.getElementById("sectionoption");
const ingredientItems = document.querySelectorAll(".ListIngredientsBtn");
const tagSection = document.getElementById("tags");

//add html brn CreatIngredientFiltre

const CreatIngredientFiltre = `
<div class="  h-14 w-48 bg-white mb-16 cursor-pointer max-h-[324px] rounded-lg m-0">
  <input aria-label="checkbox" type="checkbox"
         class="h-20 w-60 peer inset-x-0 opacity-0 z-10 cursor-pointer relative z-2">
  <h1 class="absolute top-[16px] left-[19px] text-base font-medium font-Manrope">Ingrédients</h1>
  <i class="fa-solid fa-chevron-down absolute top-[20px] left-[150px] transition-transform duration-500 rotate-0 peer-checked:rotate-180"></i>

  <div class="bg-white w-48  overflow-hidden transition-all duration-500 max-h-0 peer-checked:max-h-[315px] z-10 absolute top-[47px] rounded-lg pt-[12px]">
    <form class="w-40 h-[37px] display:block relative border-solid border-2 border-gray-400 mx-auto">
      <input type="search" aria-label="input ingredient" id="ingredientSearch" class="w-4/5 h-full focus:outline-none text-gray-400 text-transform:capitalize">
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
      const visibleCadres = document.querySelectorAll(
        ".cadre[style='display: block;']"
      );
      const ingredientElements = [];

      visibleCadres.forEach((cadre) => {
        const ingredientsInCadre = cadre.querySelectorAll(".ingredientElement");
        ingredientElements.push(...ingredientsInCadre);
      });

      if (ingredientElements.length > 0) {
        resolve(ingredientElements);
      } else {
        setTimeout(checkIngredients, 100); // Réessaie dans 100 ms
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
    const ListIngredients = ` <li
  class="Ingredients  text-sm font-Manrope font-normal hover:bg-yellow-500 mb-2 py-4 pl-[18px] text-transform: capitalize" >
    <button class="ListIngredientsBtn ">  ${element} </button>
  </li>`;
    const ingredientChoix = document.getElementById("list_ingredient");
    ingredientChoix.insertAdjacentHTML("beforeEnd", ListIngredients);
    // console.log(element);
  });
  initializeIngredientButtons();
});

function updateIngedientsList() {
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
    });
    initializeIngredientButtons();
  });
}

////serache
//*****jai un probleme ici "quand jecrit tout le mot il se suprime " */
/**
 * @param[input search ]
 * * @return[List Ingredients]
 */
const valueIngredient = document.getElementById("ingredientSearch");
const displayedIngredients = new Set();

valueIngredient.addEventListener("input", function () {
  const valeur = valueIngredient.value.toLowerCase();
  // const ingredientList = document.querySelectorAll(".Ingredients");

  ingredientList.forEach((ingredientItem) => {
    const ingredientName = ingredientItem.textContent.toLowerCase();

    if (valeur.length > 2) {
      if (
        ingredientName.includes(valeur) &&
        !displayedIngredients.has(ingredientName)
      ) {
        ingredientItem.style.display = "block";
        displayedIngredients.add(ingredientName); // Ajoutez le nom à l'ensemble des noms affichés
      } else {
        ingredientItem.style.display = "none"; // Masquer l'élément si le nom ne correspond pas
      }
    } else {
      ingredientItem.style.display = "block";
    }
  });
});

//param[btn ]
//return[ value btn ingredient] //cree le tags
let elementValues = [];
// const tagList = document.getElementById("tagList");

function initializeIngredientButtons() {
  const ingredientList = document.querySelectorAll(".Ingredients");
  ingredientList.forEach((button) => {
    // elementValues.push(button.textContent.trim());
    button.addEventListener("click", function () {
      const valueBtn = button.textContent.trim();
      elementValues.push(valueBtn);
      console.log("Tags :", elementValues);

      const tag = `<li
      class="tagElement  text-sm font-Manrope font-normal bg-yellow-500 mb-2 py-4   text-transform: capitalize flex row px-4   rounded-md mr-10" >
       <p class="pr-14">  ${valueBtn}  </p>
       <button class="font-bold closeTag"> <i class="fa-solid fa-x"></i> </button>
      </li>`;
      tagSection.insertAdjacentHTML("beforeEnd", tag);
      closeTag(valueBtn);
      searchWithTags(elementValues);
      updateNumberOfCards();
    });
  });
}

function closeTag(valueBtn) {
  const tagElements = document.querySelectorAll(".tagElement");

  tagElements.forEach((tagElement) => {
    const btnCloseTag = tagElement.querySelector(".closeTag");

    btnCloseTag.addEventListener("click", function () {
      tagElement.style.display = "none";
      // Retirez la valeur du tag du tableau elementValues
      elementValues = elementValues.filter((value) => value !== valueBtn);
      searchWithTags(elementValues);
      updateNumberOfCards();
    });
  });
}

//param[valueBtn ] la vaule de tage
//return[ filtre caders]//faire la recherche avec des tags
// function searchWithTags(tagValues) {
//   const tagValue = tagValues.map((value) => value.toLowerCase());

//   const cadresRecettes = document.querySelectorAll(".cadre");
//   cadresRecettes.forEach((cadre) => {
//     const titre = cadre.querySelector(".titlesCadre").textContent.toLowerCase();
//     const description = cadre
//       .querySelector(".descriptionCadre")
//       .textContent.toLowerCase();
//     const ingredients = cadre
//       .querySelector(".ingredientsCard")
//       .textContent.toLowerCase();
//     if (tagValue.length > 0) {
//       const tagsInRecipe = tagValue.some(
//         (tag) =>
//           titre.includes(tag) ||
//           description.includes(tag) ||
//           ingredients.includes(tag)
//       );
//       if (tagsInRecipe) {
//         cadre.style.display = "block"; // Affiche le cadre de recette
//       } else {
//         cadre.style.display = "none"; // Masque le cadre de recette
//       }
//     } else {
//       cadre.style.display = "block"; // Affiche le cadre de recette
//     }
//     updateIngedientsList();
//   });
// }
function searchWithTags(tagValues) {
  const tagValue = tagValues.map((value) => value.toLowerCase());

  const cadresRecettes = document.querySelectorAll(".cadre");
  cadresRecettes.forEach((cadre) => {
    const titre = cadre.querySelector(".titlesCadre").textContent.toLowerCase();
    const description = cadre
      .querySelector(".descriptionCadre")
      .textContent.toLowerCase();
    const ingredients = cadre
      .querySelector(".ingredientsCard")
      .textContent.toLowerCase();

    // Vérifie que tout les tags present dans la recette 
    const allTagsInRecipe = tagValue.every((tag) =>
      titre.includes(tag) || description.includes(tag) || ingredients.includes(tag)
    );

    if (tagValue.length > 0) {
      if (allTagsInRecipe) {
        cadre.style.display = "block"; // Affiche le cadre de recette
      } else {
        cadre.style.display = "none"; // Masque le cadre de recette
      }
    } else {
      cadre.style.display = "block"; // Affiche le cadre de recette si aucun tag n'est sélectionné
    }

    updateIngedientsList();
  });
}