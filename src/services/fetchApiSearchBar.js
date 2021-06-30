export async function getIngrediente(ingrediente) {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
    const res = response.json();
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function getNome(nome) {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`);
    const res = response.json();
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function getPrimeiraLetra(primeiraLetra) {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${primeiraLetra}`);
    const res = response.json();
    return res;
  } catch (error) {
    console.error(error);
  }
}
