const fetchSearch = async (search, searchRadio, searchApi) => {
  // if (ev) ev.preventDefault();
  let url;

  switch (searchRadio) {
  case 'Ingrediente':
    console.log('CAIUUUUUUUUUUUUUUUUUUUUUU');
    url = `https://www.${searchApi}.com/api/json/v1/1/filter.php?i=`;
    break;
  case 'Nome':
    url = `https://www.${searchApi}.com/api/json/v1/1/search.php?s=`;
    break;
  case 'Primeira letra':
    if (search.length !== 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
      return;
    }
    url = `https://www.${searchApi}.com/api/json/v1/1/search.php?f=`;
    break;
  default:
    break;
  }

  console.log(`${url}${search}`);
  try {
    const response = await fetch(`${url}${search}`);
    const data = await response.json();
    const results = data.meals || data.drinks;

    const INDEX_END = 12;
    const resultsTwelveItems = results.slice(0, INDEX_END);

    console.log(resultsTwelveItems); // APAGAR DEPOIS
    setStateRedux({ resultsTwelveItems });
    return resultsTwelveItems;
  } catch (error) {
    console.error(error);
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }
};

export default fetchSearch;
