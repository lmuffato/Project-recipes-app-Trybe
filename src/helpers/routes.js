import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Explore from '../pages/Explore';
import Foods from '../pages/MainFoods';
import Drinks from '../pages/MainDrinks';
import FoodDetails from '../pages/FoodDetails';
import DrinkDetails from '../pages/DrinkDetails';
import ExploreFood from '../pages/ExploreFood';
import ExploreDrink from '../pages/ExploreDrink';
import IngredientsPage from '../pages/IngredientsPage';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import ExploreByAreaPage from '../pages/ExploreByAreaPage';
import FoodInProgress from '../pages/FoodInProgress';
import DrinkInProgress from '../pages/DrinkInProgress';
import RecipesDonePage from '../pages/RecipesDonePage';

export default [
  {
    path: '/',
    Component: Login,
    exact: true,
    title: 'Login',
  },
  {
    path: '/comidas',
    Component: Foods,
    exact: true,
    title: 'Comidas',
  },
  {
    path: '/bebidas',
    Component: Drinks,
    exact: true,
    title: 'Bebidas',
  },
  {
    path: '/comidas/:id',
    Component: FoodDetails,
    exact: true,
    title: 'Comidas',
  },
  {
    path: '/bebidas/:id',
    Component: DrinkDetails,
    exact: true,
    title: 'Bebidas',
  },
  {
    path: '/explorar',
    Component: Explore,
    exact: true,
    title: 'Explorar',
  },
  {
    path: '/explorar/comidas',
    Component: ExploreFood,
    exact: true,
    title: 'Explorar Comidas',
  },
  {
    path: '/explorar/bebidas',
    Component: ExploreDrink,
    exact: true,
    title: 'Explorar Bebidas',
  },
  {
    path: '/explorar/comidas/ingredientes',
    Component: IngredientsPage,
    exact: false,
    title: 'Explorar Ingredientes',
  },
  {
    path: '/explorar/bebidas/ingredientes',
    Component: IngredientsPage,
    exact: false,
    title: 'Explorar Ingredientes',
  },
  {
    path: '/explorar/comidas/area',
    Component: ExploreByAreaPage,
    exact: false,
    title: 'Explorar Origem',
  },
  {
    path: '/perfil',
    Component: Profile,
    exact: true,
    title: 'Perfil',
  },
  {
    path: '/receitas-feitas',
    Component: RecipesDonePage,
    exact: true,
    title: 'Receitas Feitas',
  },
  {
    path: '/receitas-favoritas',
    Component: FavoriteRecipes,
    exact: true,
    title: 'Receitas Favoritas',
  },
  {
    path: '/bebidas/:id/in-progress',
    Component: DrinkInProgress,
    exact: true,
    title: 'Bebida em progresso',
  },
  {
    path: '/comidas/:id/in-progress',
    Component: FoodInProgress,
    exact: true,
    title: 'Comida em progresso',
  },
];
