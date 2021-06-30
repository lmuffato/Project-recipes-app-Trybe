import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Drink from './pages/Drink/index';
import Food from './pages/Food/index';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          {/* <Route exact path="/" component={ Login } /> */}
          <Route path="/comidas" component={ Food } />
          <Route path="/bebidas" component={ Drink } />
          {/* <Route path="/comidas/{id-da-receita}" component={ FoodDetails } />
          <Route path="/bebidas/{id-da-receita}" component={ DrinkDetails } />
          <Route path="/comidas/{id-da-receita}/in-progress" component={ FoodInProgress } />
          <Route path="/bebidas/{id-da-receita}/in-progress" component={ DrinInProgress } />
          <Route path="/explorar" component={ Explore } />
          <Route path="/explorar/comidas" component={ ExploreFoods } />
          <Route path="/explorar/bebidas" component={ ExploreDrinks } /> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
