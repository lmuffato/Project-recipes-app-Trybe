import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import fetchAPI from '../services/index';
import heartWhite from '../images/whiteHeartIcon.svg';
import heartBlack from '../images/blackHeartIcon.svg';
import shareimg from '../images/shareIcon.svg';
import { createIngredientsList } from '../utils';
import '../css/ComidasEmProcessoCSS.css';

function BebidasEmProcesso() {
  const { id } = useParams();
  const history = useHistory();

  const [drink, setDrink] = useState({});
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(true);
  const [share, setShare] = useState(false);
  const [listIngredients, setListIngredients] = useState([]);

  const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const [indexChecked, setIndexChecked] = useState(storage.cocktails[id] || []);

  const storageFavorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const [favorite, setFavorite] = useState(storageFavorite
    .some((item) => item.id === id));
  // se retorna true está favoritado, se falso nao estava favoritado

  useEffect(() => {
    setLoading(true);
    const fetchDrink = async () => {
      const data = await fetchAPI(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      console.log(data.drinks[0]);
      setDrink(data.drinks[0]);
      console.log(data.drinks[0]);

      const ingredientes = createIngredientsList(data.drinks[0]);
      const filter = ingredientes.filter((item) => item[0] !== null);
      setListIngredients(filter);

      setLoading(false);
    };
    console.log('aaaaa');

    fetchDrink();
  }, [id]);

  useEffect(() => {
    const previousIngredientes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    console.log(previousIngredientes);

    const newIngredientes = {
      ...previousIngredientes,
      cocktails: {
        ...previousIngredientes.cocktails,
        [id]: indexChecked,
      },
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify(newIngredientes));

    setFinished(listIngredients.length !== indexChecked.length);
  }, [indexChecked, listIngredients, id]);

  function handleClick() {
    // se retorna true está favoritado, se falso nao estava favoritado
    if (!favorite) {
      // se nao estiver favoritado eu tenho que colocar no local storage
      setFavorite(true);

      const newFavorite = [
        ...storageFavorite,
        {
          id,
          type: 'bebida',
          area: '',
          category: drink.strCategory,
          alcoholicOrNot: drink.strAlcoholic,
          name: drink.strDrink,
          image: drink.strDrinkThumb,
        },
      ];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite));
    }

    if (favorite) {
      // se ja estiver favoritado eu tenho que tirar do local storage
      setFavorite(false);
      const removeFavorite = storageFavorite.filter((item) => item.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(removeFavorite));
    }
  }

  function handleShare() {
    copy(`http://localhost:3000/bebidas/${id}`);
    setShare(true);
  }

  function checkedStyle({ target: { checked } }, ingredient) {
    if (checked) return setIndexChecked((previous) => ([...previous, ingredient]));
    const filterChecked = indexChecked.filter((item) => item !== ingredient);
    setIndexChecked(filterChecked);
  }

  function renderList() {
    console.log(listIngredients);
    return listIngredients.map((item, index) => (
      <div key={ index } className="checkbox">
        <label
          htmlFor="checks"
          key={ index }
          className={
            indexChecked.includes(item[0]) ? 'text-decoration' : 'no-decoration'
          }
          data-testid={ `${index}-ingredient-step` }
        >
          <input
            type="checkbox"
            id="checks"
            onClick={ (ev) => checkedStyle(ev, item[0]) }
            checked={ indexChecked.includes(item[0]) }
          />
          { `${item[0]} - ${item[1]}` }
        </label>
      </div>
    ));
  }

  if (loading) return <p>carregando</p>;

  return (
    <section className="progress-page">
      <img
        src={ drink.strDrinkThumb }
        data-testid="recipe-photo"
        alt="imagem da refeição"
      />

      <div className="header-progress">
        <div>
          <h3 data-testid="recipe-title">{ drink.strDrink }</h3>
          <p data-testid="recipe-category">{ drink.strCategory }</p>
        </div>

        <button type="button" data-testid="share-btn" onClick={ handleShare }>
          <img src={ shareimg } alt="icone compartilhar" />
          { share ? 'Link copiado!' : null }
        </button>

        <button
          type="button"
          data-testid="favorite-btn"
          src={ favorite ? heartBlack : heartWhite }
          onClick={ handleClick }
        >
          <img src={ favorite ? heartBlack : heartWhite } alt="Favoritar" />
        </button>
      </div>

      { renderList() }

      <p data-testid="instructions">{ drink.strInstructions }</p>

      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ finished }
        onClick={ () => history.push('/receitas-feitas') }
      >
        finalizar
      </button>
    </section>
  );
}

export default BebidasEmProcesso;
