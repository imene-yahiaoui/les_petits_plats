/**
 * afficher la list  dans les btn de filtrage
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
      uniqueElements.add(element.textContent.toLowerCase());
    });
    /**
     * Créez une nouvelle liste sans doublons à partir de l'ensemble
     */

    const uniqueElementList = Array.from(uniqueElements);
    /**
     *Affichez la nouvelle liste sans doublons
     */
    uniqueElementList.forEach((element) => {
      const list = document.getElementById(listId);
      list.insertAdjacentHTML("beforeEnd", ListItem(typeElement, element));
    });
    initializeButtons(ElementTag, tag, closeTag, dataValue);
  });
}

/**
 * @param {input search }
 * @return {List des élementes }
 */
function searcheInbtn(ElementId, Element) {
  const valueElement = document.getElementById(ElementId);
  valueElement.addEventListener("input", function () {
    const valeur = valueElement.value.toLowerCase().replace(/<|>/g, '!');;
    /**
     * Parcours les valueElements  pour trouver correspondances
     */
    const valueElementList = document.querySelectorAll(Element);
    valueElementList.forEach((Item) => {
      const ElementName = Item.textContent.toLowerCase();

      if (valeur.length === 0) {
        Item.style.display = "block";
      } else if (valeur.length > 0) {
        if (ElementName.includes(valeur)) {
          Item.style.display = "block";
        } else {
          Item.style.display = "none";
        }
      } else {
        Item.style.display = "block";
      }
    });
  });
}

/**
 * @param {btn}
 * @return {value btn ingredient}
 * crée le tags
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
/**
 * @param {tagValues} - Les balises à utiliser pour la recherche.
 * active la recherche avec les tags
 */
function searchWithTags(tagValues) {
  performSearch(tagValues);
}
