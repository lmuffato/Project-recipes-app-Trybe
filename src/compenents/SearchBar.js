import React, { useState } from 'react';

function SearchBar() {
  const [recipes, setRecipes] = useState({});
  const [name, setName] = useState('');
  const [request, setRequest] = useState('');
  const [letter, setLetter] = useState('');

  const handleChange = (type, word) => {
    setRequest(type);
    setLetter(word);
  };

  const getData = async () => {
    if (letter === 'f' && name.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
    const endpoint = `https://www.themealdb.com/api/json/v1/1/${request}.php?${letter}=${name}`;
    await fetch(endpoint).then((data) => data.json())
      .then((results) => setRecipes(results));
  };
  console.log(recipes.meals);

  return (
    <div>
      <label htmlFor="search-input">
        <input
          type="text"
          data-testid="search-input"
          onChange={ (e) => setName(e.target.value) }
        />
      </label>

      <label htmlFor="filterType">
        Ingrediente
        <input
          type="radio"
          name="filterType"
          onChange={ () => handleChange('filter', 'i') }
          data-testid="ingredient-search-radio"
        />
      </label>

      <label htmlFor="filterType">
        Nome
        <input
          type="radio"
          name="filterType"
          onChange={ () => handleChange('search', 's') }
          data-testid="name-search-radio"
        />
      </label>

      <label htmlFor="filterType">
        Primeira letra
        <input
          type="radio"
          name="filterType"
          onChange={ () => handleChange('search', 'f') }
          data-testid="first-letter-search-radio"
        />
      </label>
      <button
        type="button"
        onClick={ () => getData() }
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
