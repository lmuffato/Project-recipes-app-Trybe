const filterClick = (obj) => {
  const { inputRadios, inputText, location, getRecipes, getDrinksRecipes } = obj;
  if (inputRadios === 'first-letter' && inputText.length > 1) {
    global.alert('Sua busca deve conter somente 1 (um) caracter');
  } else if (location.pathname === '/comidas'
   || location.pathname === '/explorar/comidas/ingredientes') {
    getRecipes(inputText, inputRadios);
  } else { getDrinksRecipes(inputText, inputRadios); }
};

export default filterClick;
