import { useState, useEffect } from 'react';

function RandomRecipe(type) {
  const [dataLocal, setDataLocal] = useState('');
  const url = (type === 'comidas')
    ? 'https://www.themealdb.com/api/json/v1/1/random.php'
    : 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setDataLocal(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchApi();
  }, [url]);
  return dataLocal;
}

export default RandomRecipe;
