const fetchCountries = async () => {
  try {
    const response = await fetch('https://restcountries.eu/rest/v2/all');
    const data = await response.json();
    const countries = data;
    return countries;
  } catch (error) { console.error(error); }
};
export default fetchCountries;
