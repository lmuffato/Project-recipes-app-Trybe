/**
 * Essa função serve para fazer um fetch a um dado endpoint,
 * retornando um objeto com a resposta.
 * Observação: Essa função já realiza o json parse na resposta da API.
 * @param {string} URL O endpoint onde será feito o GET request.
 * @return {object} Resposta da API.
 */
async function fetchAPI(URL) {
  const response = await fetch(URL);
  const data = await response.json();
  return data;
}

export default fetchAPI;
