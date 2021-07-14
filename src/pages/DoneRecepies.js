import React, { useEffect, useState, useContext } from 'react';
import CardMealDoneFav from '../compenents/CardMealDoneFav';
import CardDrinkDoneFav from '../compenents/CardDrinkDoneFav';
import SearchbarContext from '../contexts/SearchbarContext';
import Header from '../compenents/Header';

function DoneRecepies() {
  const [myDoneRecepies, setMyDoneRecepies] = useState();
  const [showDoneRecepies, setShowRecepies] = useState();
  const [validRecipes, setValidRecipes] = useState(false);
  const { setHideSearchBtn, setPageName } = useContext(SearchbarContext);

  // funções para pegar as receitas do local storage
  const getDoneRecepies = () => {
    const doneRecepiesString = localStorage.getItem('doneRecipes');
    const allDoneRecepies = JSON.parse(doneRecepiesString);
    return allDoneRecepies;
  };

  useEffect(() => {
    setPageName('Receitas Feitas');
    // função que checa se há receitas no local storage
    const recepiesStorage = getDoneRecepies();
    if (recepiesStorage === null) {
      global.alert('Você ainda não concluiu nenhuma receita!');
    } else {
      setMyDoneRecepies(recepiesStorage);
      setShowRecepies(recepiesStorage);
      setValidRecipes(true);
    }
    setHideSearchBtn(false);
  }, []);

  function setMealOrDrink(recepie, index) {
    if (recepie.type === 'meal') {
      console.log(recepie);
      return (
        <CardMealDoneFav
          recepie={ recepie }
          index={ index }
        />
      );
    } return (
      <CardDrinkDoneFav
        recepie={ recepie }
        index={ index }
      />
    );
  }

  function handleContent(param) {
    const recepiesStorage = getDoneRecepies();
    if (recepiesStorage === null) {
      global.alert('Você ainda não concluiu nenhuma receita!');
    } else if (param === 'all') {
      setShowRecepies(myDoneRecepies);
    } else if (param === 'food') {
      const mealsRecepi = myDoneRecepies.filter((recepi) => recepi.type === 'meals');
      setShowRecepies(mealsRecepi);
    } else if (param === 'drink') {
      const drinksRecepi = myDoneRecepies.filter((recepi) => recepi.type === 'drinks');
      setShowRecepies(drinksRecepi);
    }
  }

  return (
    <>
      <Header />
      <section>
        <div>
          <button
            data-testid="filter-by-all-btn"
            type="button"
            onClick={ () => handleContent('all') }
          >
            All
          </button>
          <button
            data-testid="filter-by-food-btn"
            type="button"
            onClick={ () => handleContent('food') }
          >
            Food
          </button>
          <button
            data-testid="filter-by-drink-btn"
            type="button"
            onClick={ () => handleContent('drink') }
          >
            Drinks
          </button>
        </div>

        {validRecipes && showDoneRecepies.map((recepie, index) => (
          setMealOrDrink(recepie, index)))}

      </section>
    </>
  );
}

export default DoneRecepies;
