import React, { useContext, useEffect } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import '../../../styles/Card.css';

import IngredienteCard from '../../../components/CardsComponents/IngredienteCard';
import ReceitasContext from '../../../contexts/ReceitasContext';

const INGREDIENT_LENGTH = 11;

function ExplorarComidasPorIngrediente() {
  const { fetchApi, APIIngredientsFood } = useContext(ReceitasContext);

  useEffect(() => {
    fetchApi('https://www.themealdb.com/api/json/v1/1/list.php?i=list', 'ingredientes-comidas');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header title="Explorar Ingredientes" displayButton={ false } />
      <div className="cards-container">
        {
          APIIngredientsFood && APIIngredientsFood.meals
            .filter((item, index) => index <= INGREDIENT_LENGTH)
            .map((item, index) => (
              <IngredienteCard
                key={ index }
                index={ index }
                strName={ item.strIngredient }
                page="comidas"
                endpoint={ `https://www.themealdb.com/api/json/v1/1/filter.php?i=${item.strIngredient}` }
                strThumb={ `https://www.themealdb.com/images/ingredients/${item.strIngredient}-Small.png` }
              />
            ))
        }
      </div>
      <Footer />
    </>
  );
}

export default ExplorarComidasPorIngrediente;
