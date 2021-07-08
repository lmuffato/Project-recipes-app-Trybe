import React from 'react';
import { Button } from 'react-bootstrap';
import FavoriteCards from '../components/FavoriteCards';
import Header from '../components/Header';

export default function FavoriteRecipes() {
  return (
    <div>
      <Header>
        <h1 data-testid="page-title">Receitas Favoritas</h1>
      </Header>
      <Button data-testid="filter-by-all-btn">All</Button>
      <Button data-testid="filter-by-food-btn">Food</Button>
      <Button data-testid="filter-by-drink-btn">Drinks</Button>
      <FavoriteCards />
    </div>
  );
}
