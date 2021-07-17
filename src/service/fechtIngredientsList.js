/*
Esta função faz uma requisição a API e returna um objeto com as informações a serem preenchidas
nos 12 cards de pesquisa for ingredientes
- Ela recebe como parâmetros o type (podendo ser 'Meal' ou 'Drink')
*/

async function fechtIngredientsList(type) {
  const siteName = type === 'Meal' ? 'meal' : 'cocktail';
  const endpoint = `https://www.the${siteName}db.com/api/json/v1/1/list.php?i=list`;
  const thumbnailBase = `https://www.the${siteName}db.com/images/ingredients/`;
  const dataIngredients = await fetch(endpoint)
    .then((response) => response.json())
    .then((response) => response[`${type.toLowerCase()}s`])
    .catch((error) => console.log(error));
  const listLength = 12;
  const ingredientsList = dataIngredients.reduce((acc, ingredient, index) => {
    if (index < listLength) {
      const name = ingredient[`strIngredient${type === 'Drink' ? '1' : ''}`];
      const cardInfo = {
        name,
        thumb: `${thumbnailBase}${name}-Small.png`,
      };
      acc.push(cardInfo);
    }
    return acc;
  }, []);
  return ingredientsList;
}

export default fechtIngredientsList;
