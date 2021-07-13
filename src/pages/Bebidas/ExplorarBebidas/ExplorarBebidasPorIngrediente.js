import React, { useContext, useEffect } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import '../../../styles/Card.css';

import IngredienteCard from '../../../components/CardsComponents/IngredienteCard';
import ReceitasContext from '../../../contexts/ReceitasContext';

const INGREDIENT_LENGTH = 11;

function ExplorarBebidasPorIngrediente() {
  const { fetchApi, APIIngredientsDrink } = useContext(ReceitasContext);

  useEffect(() => {
    fetchApi('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list', 'ingredientes-bebidas');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header title="Explorar Ingredientes" displayButton={ false } />
      <div className="cards-container">
        {
          APIIngredientsDrink && APIIngredientsDrink.drinks
            .filter((item, index) => index <= INGREDIENT_LENGTH)
            .map((item, index) => (
              <IngredienteCard
                key={ index }
                index={ index }
                strName={ item.strIngredient1 }
                page="bebidas"
                endpoint={ `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${item.strIngredient1}` }
                strThumb={ `https://www.thecocktaildb.com/images/ingredients/${item.strIngredient1}-Small.png` }
              />
            ))
        }
      </div>
      <Footer />
    </>
  );
}

export default ExplorarBebidasPorIngrediente;
