import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchbarProvider from './contexts/SeachbarProvider';
<<<<<<< HEAD
import Explore from './pages/Explore';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import DrinksIngredients from './pages/DrinksIngredients';
import FoodsIngredients from './pages/FoodsIngredients';
import FoodsArea from './pages/FoodsArea';
import NotFound from './compenents/NotFound';
import MealDescription from './compenents/MealDescription';
import DrinkDescription from './compenents/DrinkDescription';
=======
import ProvidersManager from './contexts/ProvidersManager';
>>>>>>> b2e4ddb7360ba0d39f6cee355582cc4e135476a9

function App() {
  return (
    <div className="meals">
<<<<<<< HEAD
      <UserProvider>
        <SearchbarProvider>
          <Header />
          <Switch>
            <Route path="/comidas/:detalhes" component={ MealDescription } />
            <Route path="/bebidas/:detalhes" component={ DrinkDescription } />
            <Route exact path="/" component={ LoginPage } />
            <Route exact path="/explorar" component={ Explore } />
            <Route exact path="/explorar/comidas" component={ Foods } />
            <Route exact path="/explorar/bebidas" component={ Drinks } />
            <Route path="/perfil" component={ Profile } />
            <Route path="/receitas-feitas" component={ ReceitasFeitas } />
            <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
            <Route
              path="/explorar/comidas/ingredientes"
              component={ FoodsIngredients }
            />
            <Route
              path="/explorar/bebidas/ingredientes"
              component={ DrinksIngredients }
            />
            <Route exact path="/explorar/comidas/area" component={ FoodsArea } />
            <Route exact path="/explorar/bebidas/area" component={ NotFound } />
          </Switch>
          <Footer />
        </SearchbarProvider>
      </UserProvider>
=======
      <SearchbarProvider>
        <ProvidersManager />
      </SearchbarProvider>
>>>>>>> b2e4ddb7360ba0d39f6cee355582cc4e135476a9
    </div>
  );
}

export default App;
