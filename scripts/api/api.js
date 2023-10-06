/**
 * @returns {data || undefined} Les données des recettes si la requête réussit, sinon undefined en cas d'erreur.
 * effectue une requête pour récupérer les données à partir du fichier JSON des recettes.
 */
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
