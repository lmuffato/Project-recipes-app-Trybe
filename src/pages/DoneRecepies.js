import React, { useEffect, useState } from 'react';
import Share from '../images/shareIcon.svg';

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

  function handleContent(all, food, drink) {
    if(all) {
      setShowRecepies(doneRecepies);
    } else if(food) {
      const mealsRecepi = recepiesStorage.filter((recepie) => recepi.type === 'meals');
      setShowRecepies(mealsRecepi);
    } else if(drink) {
      const drinksRecepi = recepiesStorage.filter((recepie) => recepi.type === 'drinks');
      setShowRecepies(drinksRecepi);
    }
  }

  return (
    <div>
      <div>
        <button
          data-testid="filter-by-all-btn"
          onClick={handleContent(all)}
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          onClick={handleContent(food)}
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          onClick={handleContent(drink)}
        >
          Drinks
        </button>
      </div>
    {showDoneRecepies.map((recepie, index) => {
      if (recepie.type === meal) {
        // <Componente cardFood image, name, category, area, doneDate, tags />
        <div>
        <img data-testid={`${index}-horizontal-image`}>{ recepie.image }</img>
        <p data-testid={`${index}-horizontal-name`}>{recepie.name}</p>
        <p data-testid={`${index}-horizontal-top-text>`}>{recepie.category}</p>
        <p>{recepie.area}</p>
        <p data-testid={`${index}-horizontal-done-date`}>{recepie.doneDate}</p>
        <p data-testid={`${index}-${tags}-horizontal-tag`}>{`recepie.tags[0]}, {recepie.tags[1]`}</p>
        <img data-testid={`${index}-horizontal-share-btn`} src={Share} alt="share"></img>
      </div>
    } else if (recepie.type === drink) {
      // // <Componente cardDrink image, name, doneDate, alcoholicOrNot />
      <div>
        <img data-testid={`${index}-horizontal-image`}>{ recepie.image }</img>
        <p>alcólica:{recepie.alcoholicOrNot}</p> 
        <p data-testid={`${index}-horizontal-done-date`}>{recepie.doneDate}</p>
        <img data-testid={`${index}-horizontal-share-btn`} src={Share} alt="share"></img>
      </div>
    }
    })
  }
    </div>
  )
}

export default DoneRecepies;