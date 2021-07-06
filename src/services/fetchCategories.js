const fetchCategories = async (url) => {
  const categories = await fetch(url).then((response) => response.json());
  return categories;
};

export default fetchCategories;
