import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
// import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import './App.css';
import Foods from './pages/foods/Foods';
import Drinks from './pages/drinks/Drinks';
import Explorar from './pages/Explorar';
import Perfil from './pages/Perfil';
import FoodDetails from './pages/foods/FoodDetails';
import FoodProgress from './pages/foods/FoodProgress';
import DrinkDetails from './pages/drinks/DrinkDetails';
import DrinkProgress from './pages/drinks/DrinkProgress';
import ExploreDrink from './pages/explore/ExploreDrink';
import ExploreFood from './pages/explore/ExploreFood';
import DrinkIngredients from './pages/explore/DrinkIngredients';
import FoodIngredients from './pages/explore/FoodIngredients';
import FoodArea from './pages/explore/FoodArea';
import DoneRecipies from './pages/DoneRecipies';
import FavoriteRecipies from './pages/FavoriteRecipies';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/bebidas" component={ Drinks } />
        <Route exact path="/comidas" component={ Foods } />
        <Route
          exact
          path="/bebidas/:id"
          render={ (props) => <DrinkDetails { ...props } /> }
        />
        <Route
          exact
          path="/comidas/:id"
          render={ (props) => <FoodDetails { ...props } /> }
        />
        <Route
          exact
          path="/bebidas/:id/in-progress"
          render={ (props) => <DrinkProgress { ...props } /> }
        />
        <Route
          exact
          path="/comidas/:id/in-progress"
          render={ (props) => <FoodProgress { ...props } /> }
        />
        <Route exact path="/explorar" component={ Explorar } />
        <Route exact path="/explorar/bebidas" component={ ExploreDrink } />
        <Route exact path="/explorar/comidas" component={ ExploreFood } />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ DrinkIngredients }
        />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ FoodIngredients }
        />
        {/* <Route exact path="/explorar/bebidas/area" component={ Login } /> */}
        <Route exact path="/explorar/comidas/area" component={ FoodArea } />
        <Route exact path="/perfil" component={ Perfil } />
        <Route exact path="/receitas-feitas" component={ DoneRecipies } />
        <Route exact path="/receitas-favoritas" component={ FavoriteRecipies } />
        {/* <Route exact path="/feedback" component={ Feedback } /> */}
        <Route path="*" component={ NotFound } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
// import React from 'react';
// import './App.css';
// import rockGlass from './images/rockGlass.svg';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function App() {
//   return (
//     <div className="meals">
//       <span className="logo">TRYBE</span>
//       <object
//         className="rocksGlass"
//         type="image/svg+xml"
//         data={ rockGlass }
//       >
//         Glass
//       </object>
//     </div>
//   );
// }

// export default App;
