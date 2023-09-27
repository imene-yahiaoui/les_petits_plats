/**
 * @return[data]
 *
 */

const originalCadres = [];

let cadreCount = 0;

async function processRecipes() {
  const dataArray = await fetchData();
  dataArray.reverse();
  dataArray.forEach((data) => {
    const cadre = card(data);
    cadreCount++;
    pageObject.DisplayCard(cadre);
    originalCadres.push(cadre);
  });
  numbreOfCard();
}

function numbreOfCard() {
  pageObject.addCard(rendreCardCount(cadreCount));
}
processRecipes();
fetchData();
let originalId = pageObject.cadre().getAttribute("data-id");
//metre a jour le numero de cardes
function updateNumberOfCards() {
  const numberOfVisibleCadres = pageObject.visibleCadres().length;

  pageObject.sectionFiltreNumber().innerHTML = rendreCardCount(
    numberOfVisibleCadres
  );
}

//////////////////recherche////////////
searchValue.addEventListener("input", SeracheWithInput);

function SeracheWithInput() {
  const valeurDeRecherche = searchValue.value.toLowerCase();
  // const cadresRecettes = document.querySelectorAll(".cadre");
  const cadresRecettes = pageObject.visibleCadres();
  const matchCadres = [];
  cadresRecettes.forEach((cadre) => {
    const titre = cadre.querySelector(".titlesCadre").textContent.toLowerCase();

    const description = cadre
      .querySelector(".descriptionCadre")
      .textContent.toLowerCase();
    const ingredients = cadre
      .querySelector(".ingredientsCard")
      .textContent.toLowerCase();
    console.log(valeurDeRecherche.length);

    if (
      titre.includes(valeurDeRecherche) ||
      description.includes(valeurDeRecherche) ||
      ingredients.includes(valeurDeRecherche)
    ) {
      matchCadres.push(cadre);
    }  
console.log(valeurDeRecherche.length)
    pageObject.cadre().innerHTML = "";
    // if (valeurDeRecherche.length < 2 || valeurDeRecherche.length === 0) {
    //   originalCadres.forEach((cadre) => {
    //     pageObject.cadre().insertAdjacentHTML("afterbegin", cadre)
     
    //   });
    //   // cadre.style.display = "block"
    // } else
    if(valeurDeRecherche.length > 2)
    {
      matchCadres.forEach((cadre) => {
        pageObject.cadre().appendChild(cadre);
      });
    }

    
  });
  if( valeurDeRecherche.length > 2 && matchCadres.length === 0){
    console.log('le resu est 0')
    const existingNoMatchMessage = document.getElementById("NoMatchview");
if (existingNoMatchMessage){
  existingNoMatchMessage.remove();
}
   
  main.insertAdjacentHTML("afterend", NoMatchCard(valeurDeRecherche))
  }
  if(valeurDeRecherche.length <= 2 ){
    originalCadres.forEach((cadre) => {
    pageObject.DisplayCard(cadre);
    })
  }
  updateNumberOfCards();
  updateIngredientsList();
  updateAppareilList();
  updateUstensileList();
}

BtnSearche.addEventListener("click", (e) => {
  e.preventDefault();
});
