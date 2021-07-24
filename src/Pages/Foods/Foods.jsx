import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import context from '../../store/Context';
import { Header, Footer } from '../../components';
import colors from '../../Styles/colors';
import bg from '../../images/old-paper-bg.jpg';

function Foods() {
  const {
    foods,
    catFoods,
    setCategoryF,
    categoryF,
    inProgressRecipes,
  } = useContext(context);
  const stopCard = 11;
  const stopCat = 4;
  const handleClick = (categoryName) => {
    setCategoryF(categoryName);
    if (categoryName === categoryF) {
      setCategoryF('All');
    } else {
      setCategoryF(categoryName);
    }
  };

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }, [inProgressRecipes]);

  const style = {
    div: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      backgroundImage: `url(${bg})`,
    },
    button: {
      fontFamily: 'MedievalSharp, Cursive',
      width: '33vw',
      color: colors.cor3,
      padding: 11,
    },
    recipe: {
      fontFamily: 'MedievalSharp, Cursive',
      color: colors.cor3,
      margin: 5,
      backgroundColor: colors.cor1,
      padding: 10,
      borderRadius: 10,
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 900,
      boxShadow: '0 10px 15px 3px rgb(84, 43, 41)',
    },
    img: {
      width: '40vw',
      marginBottom: 3,
    },
    conteiner: {
      display: 'flex',
      flexWrap: 'wrap',
      padding: 5,
      justifyContent: 'center',
      backgroundImage: `url(${bg})`,
      backgroundSize: 'contain',
      paddingBottom: 50,
    },
  };

  return (
    <>
      <Header title="Comidas" />
      <div style={ style.div }>
        <button
          type="button"
          onClick={ () => setCategoryF('All') }
          data-testid="All-category-filter"
          style={ style.button }
        >
          All
        </button>
        {
          catFoods.filter((_, index) => index <= stopCat)
            .map(({ strCategory }) => (
              <button
                type="button"
                key={ strCategory }
                data-testid={ `${strCategory}-category-filter` }
                onClick={ () => handleClick(strCategory) }
                style={ style.button }
              >
                {strCategory}
              </button>
            ))
        }
      </div>
      <div style={ style.conteiner }>
        {
          foods.filter((_, index) => index <= stopCard)
            .map((food, index) => (
              <Link to={ `/comidas/${food.idMeal}` } key={ food.idMeal }>
                <div
                  key={ food.idMeal }
                  data-testid={ `${index}-recipe-card` }
                  style={ style.recipe }
                >
                  <img
                    src={ food.strMealThumb }
                    alt="Receita pronta"
                    data-testid={ `${index}-card-img` }
                    style={ style.img }
                  />
                  <p data-testid={ `${index}-card-name` }>{food.strMeal}</p>
                </div>
              </Link>
            ))
        }
      </div>
      <Footer />
    </>
  );
}

export default Foods;
