import React from 'react';
import FilterMealsByCategories from '../components/FilterMealsByCategories';
import Header from '../components/Header';
import MealsCards from '../components/MealsCards';
import SearchButton from '../components/SearchButton';
import InferiorMenu from '../components/InferiorMenu';
import '../CSS/MainRecipes.css';

export default function MainRecipes() {
  return (
    <div>
      <Header className="header">
        <h1 data-testid="page-title">Comidas</h1>
        <SearchButton page="/comidas" />
      </Header>
      <FilterMealsByCategories />
      <MealsCards />
      <InferiorMenu />
    </div>
  );
}
