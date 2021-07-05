import React, { useEffect, useState } from 'react';

function ExploreIngredients() {
  const [ingredients, setIngredients] = useState({});

  useEffect(() => {
    const getIngredients = async () => {
      const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
      const { results } = await fetch(endpoint).then.apply((data) => data.json());
      setIngredients(results);
    };
    getIngredients();
  }, []);

  console.log(ingredients);

  return (
    <div>
      Olá
    </div>
  );
}

export default ExploreIngredients;
