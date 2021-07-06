const makeObjIngredients = (recipe) => {
  const allKeys = Object.keys(recipe); // pego todas as chaves do obj q vem da API (receita)
  const keysIngredients = allKeys.filter((key) => (key.match(/ingredient/i)
  || key.match(/measure/i)) && (recipe[key] !== null)
  && recipe[key].length > 0 && recipe[key] !== ' '); // filtro as chaves q deem match com ingredient, com measura, q sejam maior que 0 e diferentes de ' '
  if (keysIngredients.length / 2 !== 0) {
    const objReturn = {};
    for (let i = 0, j = Math.round(keysIngredients.length / 2);
      i < Math.round(keysIngredients.length) / 2; i += 1, j += 1) {
      objReturn[recipe[keysIngredients[i]]] = recipe[keysIngredients[j]] || 'to taste';
    }
    return objReturn;
  }
};

export default makeObjIngredients;

// O laço for acima inicia com uma variavel no inicio do array e outra no meio do array
// Daí o objeto vai sendo montado...
