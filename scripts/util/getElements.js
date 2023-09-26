/**
 * afficher la list  dans les btn
 */
function waitForElements(
  selector,
  listId,
  typeElement,
  ElementTag,
  tag,
  closeTag,
  dataValue
) {
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
    initializeButtons(ElementTag, tag, closeTag, dataValue);
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
function initializeButtons(ElementTag, tag, closeTag, dataValue) {
  const ElementList = document.querySelectorAll(ElementTag);
  ElementList.forEach((button) => {
    button.addEventListener("click", function () {
      const valueBtn = button.textContent.trim();
      elementValues.push(valueBtn);
      console.log("Tags :", elementValues);

      tagSection.insertAdjacentHTML(
        "beforeEnd",
        Tag(tag, closeTag, dataValue, valueBtn)
      );
      closeBtnTagAppareil(valueBtn);
      closeBtnTagIngredient(valueBtn);
      closeBtnTagUstensile(valueBtn);
      searchWithTags(elementValues);

      updateNumberOfCards();
    });
  });
}

// /**
//  * @return[ searche whith tags]
//  */
function searchWithTags(tagValues) {
  const tagValue = tagValues.map((value) => value.toLowerCase());
  
  const cadresRecettes = document.querySelectorAll(".cadre");
  // Vérifie si tous les tags ont été supprimés
  console.log("tagValue.length 1 ", tagValue.length);
  const allTagsRemoved = tagValue.length < 0;

  cadresRecettes.forEach((cadre) => {
    const titre = cadre.querySelector(".titlesCadre").textContent.toLowerCase();
    const description = cadre
      .querySelector(".descriptionCadre")
      .textContent.toLowerCase();
    const ingredients = cadre
      .querySelector(".ingredientsCard")
      .textContent.toLowerCase();
    const Appareil = cadre.querySelector(".appareil").textContent.toLowerCase();
    const Ustensiles = cadre
      .querySelector(".Ustensiles")
      .textContent.toLowerCase();
     const allTagsInRecipe = tagValue.every(
      (tag) =>
        titre.includes(tag) ||
        description.includes(tag) ||
        ingredients.includes(tag) ||
        Appareil.includes(tag) ||
        Ustensiles.includes(tag)
    );

    if (allTagsRemoved || allTagsInRecipe) {
      cadre.style.display = "block"; // Affiche le cadre de recette
    } else {
      cadre.style.display = "none"; // Masque le cadre de recette
    }
  });

  // Si aucun tag n'a été supprimé, conserve l'état précédent de l'affichage
  if (!allTagsRemoved) {
    updateIngredientsList();
    updateAppareilList();
    updateUstensileList();
  }
}


 