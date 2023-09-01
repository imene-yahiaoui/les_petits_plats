/**
 * @param[fetchData]
 * 
 */
const fetchData = async () => {
  try {
    const requete = await fetch("../public/recipes.json", {
      method: "GET",
    });
    if (requete.ok) {
      const data = await requete.json();
      console.log(data);
      return data;
    }
  } catch (e) {
    console.log(e);
  }
};

/**
 * @param[all data]
 */
async function processRecipes() {
    const dataArray = await fetchData();  
    dataArray.forEach((data) => {
      card(data); 
    });
  }
  
  processRecipes();


function card(data) {
  const { name, description, quantity, unit, ingredients, image, time } = data;
  const picture = `./assets/images/${image}`;

  //


 // Créer une liste d'ingrédients en parcourant le tableau d'ingrédients
 const ingredientsList = ingredients.map((ingr) => `
 <li>
   <p>${ingr.ingredient}</p>
   ${ingr.quantity ? `<p>${ingr.quantity} ${ingr.unit || ''}</p>` : ''}
 </li>
`).join('');

  //
  const cadre = `
    <figure class="cadre ">  
    <div>
    <img   src="${picture}" alt="recette de ${name}">
    <p> ${time} </p>
    </div>
    
    <h1> ${name} </h1>
    <p>RECETTE</p>
    <figcaption> ${description} </figcaption>
    <div class="">
    <p> Ingrédients </p>

    <ul>
      ${ingredientsList}
    </ul>
  </div>
  
    </figure>
    `;

  document.getElementById("cards").insertAdjacentHTML("afterbegin", cadre);
}

fetchData();
