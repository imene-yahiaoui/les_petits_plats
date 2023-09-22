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