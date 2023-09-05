async function processRecipes() {
  const dataArray = await fetchData();
  const dataArrayLength = dataArray.length;
  dataArray.reverse();
  dataArray.forEach((data) => {
    card(data);
    displayIngredientsList2(data);
  });
}

processRecipes();
/**
 * ingredientsbtn
 * @param[data ]
 * * @return[ingredientChoix]
 */

// async function displayIngredientsList() {
//   const dataList = await fetchData();
//   console.log("data length :", dataList.length);

//   dataList.forEach((data) => {
//     const ingredientsListnoset = data.ingredients.map((ingr) => ingr.ingredient);
//     console.log("ingredientsListnoset :", ingredientsListnoset);

//     const uniqueWords = [];
//     const seenWords = new Set();

//     ingredientsListnoset.forEach((word) => {
//       if (!seenWords.has(word)) {
//         uniqueWords.push(word);
//         seenWords.add(word);
//       }
//     });

//     console.log("uniqueWords :", uniqueWords);
//   });
// }
// displayIngredientsList()
//////////////////2///////////
function displayIngredientsList2(data) {
  const { ingredients } = data;
  /**
   * ingredientsbtn
   * @param[data ]
   * * @return[ingredientChoix]
   */
  const ingredientsbtn = ingredients.map((ingr) => ingr.ingredient);
  // console.log("ingredientsbtn",ingredientsbtn)
  function a() {
    for (let i = 0; i < ingredientsbtn.length; i++) {
      const tableaux = [ingredientsbtn];
      console.log("tab", tableaux);
      const tableauFinal = tableaux.reduce(
        (acc, currentArray) => acc.concat(currentArray),
        []
      );

      console.log("tableauxfinal", tableauFinal);
    }
  }
  a();

  //   const tableauFinal = ingredientsbtn.reduce((acc, currentArray) => acc.concat(currentArray), []);

  // console.log("fff",tableauFinal);
}
