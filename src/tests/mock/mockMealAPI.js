// categorias: https://www.themealdb.com/api/json/v1/1/list.php?c=list
// areas: https://www.themealdb.com/api/json/v1/1/list.php?a=list
// ingredientes: https://www.themealdb.com/api/json/v1/1/list.php?i=list

const ONE_SECOND = 1000;
const API_ERROR = 'Api Error!';

export const mockApiByCategory = () => new Promise(((resolve, reject) => {
  setTimeout(() => resolve({ meals: [{ strCategory: 'Beef' },
    { strCategory: 'Breakfast' }, { strCategory: 'Chicken' },
    { strCategory: 'Dessert' }, { strCategory: 'Goat' },
    { strCategory: 'Lamb' }, { strCategory: 'Miscellaneous' },
    { strCategory: 'Pasta' }, { strCategory: 'Pork' }, { strCategory: 'Seafood' },
    { strCategory: 'Side' }, { strCategory: 'Starter' }, { strCategory: 'Vegan' },
    { strCategory: 'Vegetarian' }] }), ONE_SECOND);

  setTimeout(() => reject(new Error(API_ERROR)), ONE_SECOND);
}));

export const mockApiByAreas = new Promise(((resolve, reject) => {
  setTimeout(() => resolve({ meals: [{ strArea: 'American' }, { strArea: 'British' },
    { strArea: 'Canadian' }, { strArea: 'Chinese' }, { strArea: 'Dutch' },
    { strArea: 'Egyptian' }, { strArea: 'French' }, { strArea: 'Greek' },
    { strArea: 'Indian' }, { strArea: 'Irish' }, { strArea: 'Italian' },
    { strArea: 'Jamaican' }, { strArea: 'Japanese' }, { strArea: 'Kenyan' },
    { strArea: 'Malaysian' }, { strArea: 'Mexican' }, { strArea: 'Moroccan' },
    { strArea: 'Polish' }, { strArea: 'Portuguese' }, { strArea: 'Russian' },
    { strArea: 'Spanish' }, { strArea: 'Thai' }, { strArea: 'Tunisian' },
    { strArea: 'Turkish' }, { strArea: 'Unknown' },
    { strArea: 'Vietnamese' }] }), ONE_SECOND);

  setTimeout(() => reject(new Error(API_ERROR)), ONE_SECOND);
}));

export const mockApiByIngredients = new Promise(((resolve, reject) => {
  setTimeout(() => resolve({ meals: [{ idIngredient: '1',
    strIngredient: 'Chicken',
    strDescription: 'The chicken is a type of domesticated fowl,'
    + ' a subspecies of the red junglefowl (Gallus gallus). It is one of the most common'
    + ' and widespread domestic animals, with a total population of more '
    + 'than 19 billion as of 2011. There are more chickens in the world than any other'
    + ' bird or domesticated fowl. Humans keep chickens primarily as a source of food'
    + ' (consuming both their meat and eggs) and, less commonly, as pets. '
    + 'Originally raised for cockfighting or for special ceremonies, chickens were'
    + ' not kept for food until the Hellenistic period (4th\u20132nd centuries BC)'
    + '.\r\n\r\nGenetic studies have pointed to multiple maternal origins in South Asia,'
    + ' Southeast Asia, and East Asia, but with the clade found in '
    + 'the Americas, Europe, the Middle East and Africa originating in the Indian'
    + ' subcontinent. From ancient India, the domesticated chicken spread to'
    + ' Lydia in western Asia Minor, and to Greece by the 5th century BC. Fowl '
    + 'had been known in Egypt since the mid-15th century BC, with the "bird that'
    + ' gives birth every day" having come to Egypt from the land between Syria and'
    + ' Shinar, Babylonia, according to the annals of Thutmose III.',
    strType: null },
  { idIngredient: '2',
    strIngredient: 'Salmon',
    strDescription: 'Salmon is the common name for several species of ray-finned'
    + ' fish in the family Salmonidae. Other fish in the same family include trout'
    + ', char, grayling and whitefish. Salmon are native to tributaries of '
    + 'the North Atlantic (genus Salmo) and Pacific Ocean (genus Oncorhynchus). '
    + 'Many species of salmon have been introduced into non-native environments'
    + ' such as the Great Lakes of North America and Patagonia in South '
    + 'America. Salmon are intensively farmed in many parts of the world.\r\n\r\n'
    + 'Typically, salmon are anadromous: they hatch in fresh water, migrate'
    + ' to the ocean, then return to fresh water to reproduce.'
    + ' However, populations of several species are restricted to fresh'
    + ' water through their lives. Folklore has it that the fish return to'
    + ' the exact spot where they hatched to spawn. Tracking studies have '
    + 'shown this to be mostly true. A portion of a returning salmon run may'
    + ' stray and spawn in different freshwater systems; the percent of'
    + ' straying depends on the species of salmon. Homing behavior has been '
    + 'shown to depend on olfactory memory. Salmon date back'
    + ' to the Neogene.',
    strType: null }] }), ONE_SECOND);

  setTimeout(() => reject(new Error(API_ERROR)), ONE_SECOND);
}));

export const mockingredientImg = new Promise(((resolve, reject) => {
  setTimeout(() => resolve('https://www.themealdb.com/images/ingredients/chicken.png'), ONE_SECOND);

  setTimeout(() => reject(new Error(API_ERROR)), ONE_SECOND);
}));

export const mockApiRecipeDetail = new Promise(((resolve, reject) => {
  setTimeout(() => resolve({ meals: [{ idMeal: '52772',
    strMeal: 'Teriyaki Chicken Casserole',
    strDrinkAlternate: null,
    strCategory: 'Chicken',
    strArea: 'Japanese',
    strInstructions: 'Preheat oven to 350\u00b0 F. Spray a 9x13-inch baking pan'
    + ' with non-stick spray.\r\nCombine soy sauce, \u00bd cup water, '
    + 'brown sugar, ginger and garlic in a small saucepan and cover. '
    + 'Bring to a boil over medium heat. Remove lid and cook for one minute'
    + ' once boiling.\r\nMeanwhile, stir together the corn starch and 2 '
    + 'tablespoons of water in a separate dish until smooth. Once sauce is boiling,'
    + ' add mixture to the saucepan and stir to combine. Cook'
    + ' until the sauce starts to thicken then remove from'
    + ' heat.\r\nPlace the chicken breasts in the prepared pan. '
    + 'Pour one cup of the sauce over top of chicken. Place chicken in'
    + ' oven and bake 35 minutes or until cooked through. Remove from oven and'
    + ' shred chicken in the dish using two forks.\r\n*Meanwhile, steam'
    + ' or cook the vegetables according to package directions.\r\nAdd the'
    + ' cooked vegetables and rice to the casserole dish with the chicken. Add'
    + ' most of the remaining sauce, reserving a bit to drizzle'
    + ' over the top when serving. Gently toss everything together'
    + ' in the casserole dish until combined. Return to oven and cook'
    + ' 15 minutes. Remove from oven and let stand 5 minutes before serving. '
    + 'Drizzle each serving with remaining sauce. Enjoy!',
    strMealThumb: 'https:www.themealdb.comimagesmediame'
    + 'alswvpsxx1468256321.jpg',
    strTags: 'Meat,Casserole',
    strYoutube: 'https:www.youtube.comwatch?v=4aZr5hZXP_s',
    strIngredient1: 'soy sauce',
    strIngredient2: 'water',
    strIngredient3: 'brown sugar',
    strMeasure1: '34 cup',
    strMeasure2: '12 cup',
    strMeasure3: '14 cup',
    strSource: null,
    strImageSource: null,
    strCreativeCommonsConfirmed: null,
    dateModified: null }] }), ONE_SECOND);

  setTimeout(() => reject(new Error(API_ERROR)), ONE_SECOND);
}));

export const mockApiByName = () => new Promise(((resolve, reject) => {
  setTimeout(() => resolve({ meals: [
    {
      idMeal: '52771',
      strMeal: 'Spicy Arrabiata Penne',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    },
  ],
  }), ONE_SECOND);

  setTimeout(() => reject(new Error(API_ERROR)), ONE_SECOND);
}));

export const mockApiByMainIngredient = () => new Promise(((resolve, reject) => {
  setTimeout(() => resolve({ meals: [{
    strMeal: 'Brown Stew Chicken',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/sypxpx1515365095.jpg',
    idMeal: '52940' },
  { strMeal: 'Chicken & mushroom Hotpot',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/uuuspp1511297945.jpg',
    idMeal: '52846' },
  { strMeal: 'Chicken Alfredo Primavera',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/syqypv1486981727.jpg',
    idMeal: '52796' },
  { strMeal: 'Chicken Basquaise',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/wruvqv1511880994.jpg',
    idMeal: '52934' },
  { strMeal: 'Chicken Congee',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/1529446352.jpg',
    idMeal: '52956' },
  { strMeal: 'Chicken Handi',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg',
    idMeal: '52795' },
  { strMeal: 'Kentucky Fried Chicken',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/xqusqy1487348868.jpg',
    idMeal: '52813' },
  { strMeal: 'Kung Pao Chicken',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/1525872624.jpg',
    idMeal: '52945' },
  { strMeal: 'Pad See Ew',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/uuuspp1468263334.jpg',
    idMeal: '52774' },
  { strMeal: 'Piri-piri chicken and slaw',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/hglsbl1614346998.jpg',
    idMeal: '53039' },
  { strMeal: 'Thai Green Curry',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/sstssx1487349585.jpg',
    idMeal: '52814' }] }), ONE_SECOND);
  setTimeout(() => reject(new Error(API_ERROR)), ONE_SECOND);
}));
