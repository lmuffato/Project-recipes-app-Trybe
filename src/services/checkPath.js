const checkPath = (history, setter) => {
  if (history.location.pathname === '/bebidas') {
    setter('cocktail');
  } else if (history.location.pathname === '/comidas') {
    setter('meal');
  }
};

export default checkPath;
