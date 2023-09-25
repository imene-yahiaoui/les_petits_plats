const sectionOption = document.getElementById("sectionOption");
const ingredientItems = document.querySelectorAll(".ListIngredientsBtn");
const tagSection = document.getElementById("tags");
const searchValue = document.getElementById("searche");
const titlesCadre = document.querySelectorAll(".titlesCadre");
const ingredientsCard = document.querySelectorAll(".ingredientsCard");
const descriptionCadre = document.querySelectorAll(".descriptionCadre");
const BtnSearche = document.getElementById("searcheBtn");

const pageObject = {
  cadre: () => document.getElementById("cards"),
  sectionFiltre: () => document.getElementById("sectionFiltre"),
  sectionFiltreNumber: () => document.getElementById("cardesNumber"),
  tagElements: () => document.querySelectorAll(".tagIngredients"),
  visibleCadres: () =>document.querySelectorAll(".cadre[style='display: block;']"),
  DisplayCard:(card)=> pageObject.cadre().insertAdjacentHTML("afterbegin", card),
  addCard: (cardContent) =>
    pageObject.sectionFiltre().insertAdjacentHTML("beforeend", cardContent),

  ingredientChoix: () => document.getElementById("list_ingredient"),
  tagElementsAppareils: () => document.querySelectorAll(".tagAppareils"),
  ingredientChoixAppareils: () => document.getElementById("list_Appareil"),
  tagElementsUstensile: () => document.querySelectorAll(".tagUstensile"),
  ingredientChoixUstensile: () => document.getElementById("list_Ustensiles"),
  DisplaySection:(Section)=>sectionOption.insertAdjacentHTML("beforeend",  Section),
 


};
