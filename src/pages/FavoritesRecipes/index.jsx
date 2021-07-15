import React from 'react';
import HeaderBack from '../../components/HeaderBack';
import styles from './styles.module.scss';

function FavoritesRecipes() {
  return (
    <div className={ styles.favorites }>
      <HeaderBack title="Receitas Favoritas" />
      <div className={ styles.buttonsGroup }>
        <button
          className="primary-btn"
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          className="primary-btn"
          type="button"
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          className="primary-btn"
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drink
        </button>
      </div>
    </div>
  );
}

export default FavoritesRecipes;
