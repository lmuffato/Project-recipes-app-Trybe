import React, { useEffect, useState } from 'react';
import CardMealDoneFav from '../compenents/CardMealDoneFav';
import CardDrinkDoneFav from '../compenents/CardDrinkDoneFav';

function DoneRecepies () {
  const [doneRecepies, setDoneRecepies] = useState([]);
  const [showDoneRecepies, setShowRecepies] = useState(doneRecepies);
  
  // funções para pegar as receitas do local storage
  const getDoneRecepies = () => {
    const doneRecepiesString = localStorage.getItem('doneRecipes');
    const doneRecepies = JSON.parse(doneRecepiesString);
    return doneRecepies;
  }

  useEffect(() => {
    // função que checa se há receitas no local storage
    const checkDoneRecepies = () => {
      const recepiesStorage = getDoneRecepies();
      if (recepiesStorage === null) {
        alert('Você ainda não concluiu nenhuma receita!')
      } else {
        setDoneRecepies(recepiesStorage);
      }
    }

    checkDoneRecepies();
  }, []);

  function setMealOrDrink({ type, id, image, name, category, area, doneDate, tags, alcoholicOrNot }, index) {
    if (type === 'meal') {
      return (
        <CardMealDoneFav
          id={ id }
          index={ index }
          image={ image }
          name={ name }
          category={ category }
          area={ area }
          doneDate={ doneDate }
          tags={ tags }
        />
      )
    } else if (type === 'drink') {
      return (
        <CardDrinkDoneFav
          id={ id }
          index={ index }
          image={ image }
          alcoholicOrNot={ alcoholicOrNot }
          doneDate={ doneDate }
        />
      )
    }
  }

      function handleContent(param) {
    if(param === 'all') {
      setShowRecepies(doneRecepies);
    } else if(param === 'food') {
      const mealsRecepi = doneRecepies.filter((recepi) => recepi.type === 'meals');
      setShowRecepies(mealsRecepi);
    } else if(param === 'drink') {
      const drinksRecepi = doneRecepies.filter((recepi) => recepi.type === 'drinks');
      setShowRecepies(drinksRecepi);
    }
  }

  return (
    <section>
      <div>
        <button
          data-testid="filter-by-all-btn"
          onClick={ () => handleContent('all') }
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          onClick={ () => handleContent('food')}
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          onClick={ () => handleContent('drink')}
        >
          Drinks
        </button>
      </div>

      {showDoneRecepies.map(({type, id, image, name, category, area, doneDate, tags, alcoholicOrNot }, index ) => (
        setMealOrDrink({type, id, image, name, category, area, doneDate, tags, alcoholicOrNot }, index )))}

    </section>
  )
}

export default DoneRecepies;
