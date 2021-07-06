const apiRequester = async (endpoint) => fetch(endpoint)
  .then((response) => response.json());

export default apiRequester;
