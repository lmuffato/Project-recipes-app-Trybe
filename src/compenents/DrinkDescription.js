import React, { useState, useContext, useEffect } from 'react';
import SearchbarContext from '../contexts/SearchbarContext';

function DrinkDescription() {
  const { idDrink } = useContext(SearchbarContext);

  const [drink, setDrink] = useState(null);

  useEffect(() => {
    const getDrink = async () => {
      const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`;
      await fetch(endpoint).then((data) => data.json())
        .then((result) => setDrink(result));
    };
    getDrink();
  }, [idDrink]);

  return (
    <div>
      {console.log(drink)}
      <p>Descrição bebida! Deu certo</p>
    </div>
  );
}

export default DrinkDescription;
