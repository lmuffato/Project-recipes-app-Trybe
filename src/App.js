import React from 'react';
import { Switch, Route } from 'react-router';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/comidas" component={ Food } />
        <Route path="/bebidas" component={ Drink } />
        <Route path="/comidas/{id-da-receita}" component={ FoodDetails } />
        <Route path="/bebidas/{id-da-receita}" component={ DrinkDetails } />
        <Route path="/comidas/{id-da-receita}/in-progress" component={ FoodInProgress } />
        <Route path="/bebidas/{id-da-receita}/in-progress" component={ DrinInProgress } />
        <Route path="/explorar" component={ Explore } />
        <Route path="/explorar/comidas" component={ ExploreFoods } />
        <Route path="/explorar/bebidas" component={ ExploreDrinks } />
      </Switch>
    </div>
  );
}

export default App;
