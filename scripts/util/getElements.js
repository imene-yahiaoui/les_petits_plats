/**
 * afficher la list  dans les btn
 */
function waitForElements(selector, listId, typeElement,ElementTag) {
  return new Promise((resolve) => {
    const checkElements = () => {
      const visibleCadres = document.querySelectorAll(
        ".cadre[style='display: block;']"
      );
      const elements = [];

      visibleCadres.forEach((cadre) => {
        const elementsInCadre = cadre.querySelectorAll(selector);
        elements.push(...elementsInCadre);
      });

      if (elements.length > 0) {
        resolve(elements);
      } else {
        setTimeout(checkElements, 100); // Réessaie dans 100 ms
      }
    };

    checkElements();
  }).then((elements) => {
    const uniqueElements = new Set();
    elements.forEach((element) => {
      uniqueElements.add(element.textContent);
    });
    // Créez une nouvelle liste sans doublons à partir de l'ensemble
    const uniqueElementList = Array.from(uniqueElements);
    // Affichez la nouvelle liste sans doublons
    uniqueElementList.forEach((element) => {
      const list = document.getElementById(listId);
      list.insertAdjacentHTML("beforeEnd", ListItem(typeElement, element));
    });
    initializeButtons(ElementTag)
  });
}


/**
 * @param[input search ]
 * * @return[List Ingredients]
 */

function searcheInbtn(ElementId, Element) {
  const valueElement = document.getElementById(ElementId);
  valueElement.addEventListener("input", function () {
    const valeur = valueElement.value.toLowerCase();
    // Parcours les valueElements  pour trouver correspondances
    const valueElementList = document.querySelectorAll(Element);
    valueElementList.forEach((Item) => {
      const ElementName = Item.textContent.toLowerCase();

      if (valeur.length === 0) {
        Item.style.display = "block";
      } else if (valeur.length > 2) {
        if (
          ElementName.includes(valeur)
          // !displayedIngredients.has(ingredientName)
        ) {
          Item.style.display = "block";
          // displayedIngredients.add(ingredientName); // Ajoutez le nom à l'ensemble des noms affichés
        } else {
          Item.style.display = "none"; // Masquer l'élément si le nom ne correspond pas
        }
      } else {
        Item.style.display = "block";
      }
    });
  });
}

/**
 * param[btn ]
 * return[ value btn ingredient] //cree le tags
 */

let elementValues = [];
function initializeButtons(ElementTag,tag,closeTag,dataValue) {
  const ElementList = document.querySelectorAll(ElementTag);
  ElementList.forEach((button) => {
    button.addEventListener("click", function () {
      const valueBtn = button.textContent.trim();
      elementValues.push(valueBtn);
      console.log("Tags :", elementValues);
      console.log("TagsLength :", elementValues.length);
      const Tag= `<li
      class="${tag}  text-sm font-Manrope font-normal bg-yellow-500 mb-2 py-4   text-transform: capitalize flex row px-4   rounded-md mr-10" >
       <p class="pr-14">  ${valueBtn}  </p>
       <button class="font-bold ${closeTag} ${dataValue}=${valueBtn}"> <i class="fa-solid fa-x"></i> </button>
      </li>`;
      tagSection.insertAdjacentHTML("beforeEnd", Tag);
       // updateElementValuesFromLocalStorage();
      // searchWithTags(elementValues);
       // closeTag(valueBtn);
      // updateNumberOfCards();
    });
  });
}


// // /**
///////////////////////////:jai un probelem ici ////////////
// //  * return[close tag]
// //  */
function closeTag(tag,closeTag,dataValue) {
  const tagElements = document.querySelectorAll(tag);

  tagElements.forEach((tagElement) => {
    const btnCloseTag = tagElement.querySelector(closeTag);
    const tagValueToRemove = btnCloseTag.getAttribute(dataValue);

    btnCloseTag.addEventListener("click", function () {
      console.log("Tag to remove:", tagValueToRemove);
      tagElement.remove();

      // Retirez la valeur du tag du tableau elementValues
      elementValues = elementValues.filter(
        (value) => value !== tagValueToRemove
      );

      updateIngedientsList();

      // Vérifie s'il ne reste plus aucun tag, puis affiche toutes les recettes
      if (elementValues.length === 0) {
        searchWithTags([]);
      } else {
        searchWithTags(elementValues);
      }
    //   updateNumberOfCards();
    });
  });
}