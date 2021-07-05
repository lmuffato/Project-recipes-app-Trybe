export async function getIngCock(ingrediente) {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
    const res = response.json();
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function getNameCock(nome) {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`);
    const res = response.json();
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function getFirstLetterCock(primeiraLetra) {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${primeiraLetra}`);
    const res = response.json();
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function getIngCockTail(ingrediente) {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
    const res = response.json();
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function getNameCockTail(nome) {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nome}`);
    const res = response.json();
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function getFirstLetterCockTail(primeiraLetra) {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${primeiraLetra}`);
    const res = response.json();
    return res;
  } catch (error) {
    console.error(error);
  }
}
