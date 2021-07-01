import React from 'react';
// import { Route, Switch } from 'react-dom';
import { Switch, Route } from 'react-router-dom';
import ProfileScreen from './pages/ProfileScreen/ProfileScreen';
// import InitPage from './pages/InitPage/InitPage';
import Login from './pages/LoginPage/Login';
import RecipesDone from './pages/RecipesDone/RecipesDone';
import RecipesFav from './pages/RecipesFav/RecipesFav';
// import Food from './pages/FoodPage/Food';
// import Beverage from './pages/BeveragePage/Beverage';
import ExploreFoodArea from './pages/ExplorePage/ExploreFoodArea';
import Explore from './pages/ExplorePage/Explore';
import ExploreFood from './pages/ExplorePage/ExploreFood';
import ExploreBeverage from './pages/ExplorePage/ExploreBeverage';
import ExplFoodIng from './pages/ExplorePage/ExplFoodIng';
import ExplBeverageIng from './pages/ExplorePage/ExplBeverageIng';
import InitPage from './pages/InitPage/InitPage';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      {/* <Route exact path="/comidas" component={ Food } />
      <Route exact path="/bebidas" component={ Beverage } />
      <Route exact path="/comidas/52771" component={ InitPage } />
      <Route exact path="/bebidas/178319" component={ InitPage } /> */}
      <Route exact path="/comidas/52771/in-progress" component={ InitPage } />
      <Route exact path="/bebidas/178319/in-progress" component={ InitPage } />
      <Route exact path="/explorar/comidas" component={ ExploreFood } />
      <Route exact path="/explorar/bebidas" component={ ExploreBeverage } />
      <Route exact path="/explorar/comidas/ingredientes" component={ ExplFoodIng } />
      <Route exact path="/explorar/bebidas/ingredientes" component={ ExplBeverageIng } />
      <Route exact path="/explorar/comidas/area" component={ ExploreFoodArea } />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/perfil" component={ ProfileScreen } />
      <Route exact path="/receitas-feitas" component={ RecipesDone } />
      <Route exact path="/receitas-favoritas" component={ RecipesFav } />
    </Switch>
  );
}

export default Routes;
