import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const RecommendationList = ({ idn }) => {
  const [recipes, setRecipes] = useState([]);

  const gliderFunc = () => {
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 2,
    };
    return (
      <div className="slider">
        <Slider { ...settings }>
          {recipes.map((elem, index) => {
            const maxLength = 5;
            let idnFinal = '';
            if (index <= maxLength) {
              if (idn[1] === 'Meal') {
                idnFinal = 'Drink';
              } else {
                idnFinal = 'Meal';
              }
              return (
                <div key={ index } data-testid={ `${index}-recomendation-card` }>
                  <img src={ elem[`str${idnFinal}Thumb`] } alt="Recipe" />
                  {idnFinal === 'Meal'
                    ? <p>{elem.strCategory}</p> : <p>{elem.strAlcoholic}</p> }
                  <p
                    data-testid={ `${index}-recomendation-title` }
                  >
                    { elem[`str${idnFinal}`] }
                  </p>
                </div>);
            }
            return null;
          })}
        </Slider>
      </div>
    );
  };
  useEffect(() => {
    const getRecipes = async () => {
      let page = '';
      let idnKey = '';
      if (idn[0] === 'meals') {
        page = 'thecocktaildb';
        idnKey = 'drinks';
      }
      if (idn[0] === 'drinks') {
        page = 'themealdb';
        idnKey = 'meals';
      }
      const endpoint = `https://www.${page}.com/api/json/v1/1/search.php?s=`;
      const results = await fetch(endpoint).then((data) => data.json());
      setRecipes(results[idnKey]);
    };
    getRecipes();
  }, [idn]);

  return (
    <div>
      { gliderFunc() }
    </div>
  );
};

RecommendationList.propTypes = {
  idn: PropTypes.arrayOf(PropTypes.string).isRequired,
}.isRequired;

export default RecommendationList;
