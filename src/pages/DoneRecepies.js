import React, { /* useEffect,  */useState } from 'react';
import CardMealDoneFav from '../compenents/CardMealDoneFav';
import CardDrinkDoneFav from '../compenents/CardDrinkDoneFav';

function DoneRecepies() {
  const [myDoneRecepies/* , setMyDoneRecepies */] = useState();
  const [showDoneRecepies, setShowRecepies] = useState([{
    id: 12345,
    type: 'meal',
    area: 'japonese',
    category: 'Beef',
    alcoholicOrNot: 'not',
    name: 'pao com bife',
    image: 'https://st2.depositphotos.com/1571400/5785/i/600/depositphotos_57856553-stock-photo-candy.jpg',
    doneDate: '14/16/22',
    tags: ['tag1', 'tag2'],
  }, 
  {
    id: 12345,
    type: 'drink',
    area: 'japonese',
    category: 'Beef',
    alcoholicOrNot: 'not',
    name: 'pao com bife',
    image: 'https://st2.depositphotos.com/1571400/5785/i/600/depositphotos_57856553-stock-photo-candy.jpg',
    doneDate: '14/16/22',
    tags: ['tag1', 'tag1'],
  }]);

  /*   // funções para pegar as receitas do local storage
  const getDoneRecepies = () => {
    const doneRecepiesString = localStorage.getItem('doneRecepies');
    const allDoneRecepies = JSON.parse(doneRecepiesString);
    return allDoneRecepies;
  }; */

  /*   useEffect(() => {
    // função que checa se há receitas no local storage
    const checkDoneRecepies = () => {
      const recepiesStorage = getDoneRecepies();
      if (recepiesStorage === null) {
        global.alert('Você ainda não concluiu nenhuma receita!');
      } else {
        setMyDoneRecepies(recepiesStorage);
        setShowRecepies(recepiesStorage);
      }
      checkDoneRecepies();
    };
  }, []); */

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
    if (param === 'all') {
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

      {showDoneRecepies.map((recepie, index) => (
        setMealOrDrink(recepie, index)))}

    </section>
  );
}

export default DoneRecepies;
