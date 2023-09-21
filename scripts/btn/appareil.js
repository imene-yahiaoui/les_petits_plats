const CreatAppareilFiltre = `
<div class=" bg-white h-14 w-48  mb-16 cursor-pointer max-h-[324px] rounded-lg m-0">
  <input aria-label="checkbox" type="checkbox"
         class="h-20 w-60 peer inset-x-0 opacity-0 z-10 cursor-pointer relative z-2">
  <h1 class="absolute top-[16px] left-[296px] text-base font-medium font-Manrope">Appareils</h1>
  <i class="fa-solid fa-chevron-down absolute top-[20px] left-[438px] transition-transform duration-500 rotate-0 peer-checked:rotate-180"></i>

  <div class="bg-white w-48  overflow-hidden transition-all duration-500 max-h-0 peer-checked:max-h-[315px] z-10 absolute top-[47px] rounded-lg pt-[12px]">
    <form class="w-40 h-[37px] display:block relative border-solid border-2 border-gray-400 mx-auto">
      <input type="search" aria-label="input ingredient" id="AppareiSearch" class=" capitalize  w-4/5 h-full focus:outline-none text-gray-400 ">
      <button id="searchApparei" class="absolute top-[2px] right-2" aria-label="search ingredient" type="submit">
        <i class="fa-solid fa-magnifying-glass text-sm text-gray-400"></i>
      </button>
    </form>

    <ul id="list_Appareil" class="pt-4 max-h-60 overflow-y-auto"></ul>
  </div>
</div>
`;
sectionOption.insertAdjacentHTML("beforeend", CreatAppareilFiltre);

/**
 * recuper la list des Appareil
 */

function waitForAppareil() {
  return new Promise((resolve) => {
    const checkAppareil = () => {
      const visibleCadres = document.querySelectorAll(
        ".cadre[style='display: block;']"
      );
      const AppareilElements = [];

      visibleCadres.forEach((cadre) => {
        const AppareilInCadre = cadre.querySelectorAll(".appareil");
        AppareilElements.push(...AppareilInCadre);
      });

      if (AppareilElements.length > 0) {
        resolve(AppareilElements);
      } else {
        setTimeout(checkAppareil, 100); // Réessaie dans 100 ms
      }
    };

    checkAppareil();
  });
}

waitForAppareil().then((AppareilElements) => {
  const uniqueAppareil = new Set();
  AppareilElements.forEach((element) => {
    uniqueAppareil.add(element.textContent);
  });
  // Créez une nouvelle liste sans doublons à partir de l'ensemble
  const uniqueAppareilElements = Array.from(uniqueAppareil);
  // Affichez la nouvelle liste sans doublons
  uniqueAppareilElements.forEach((element) => {
    const ListAppareil = ` <li
    class="capitalize Ingredients  text-sm font-Manrope font-normal hover:bg-yellow-500 mb-2 py-4 pl-[18px] " >
      <button class="ListIngredientsBtn ">  ${element} </button>
    </li>`;
    const AppareilChoix = document.getElementById("list_Appareil");
    AppareilChoix.insertAdjacentHTML("beforeEnd", ListAppareil);
    console.log(element);
  });
//   initializeIngredientButtons();
});
{/* <div class="Ustensiles" > ${ustensils}  </div> */}