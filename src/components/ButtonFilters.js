import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import icons from '../service/iconsMapped';

export default function ButtonFilters({
  categories, functionChangeFilter, setToggle, toggle }) {
  const [filtersButtons, setFiltersButton] = useState([]);
  const screen = window.location.pathname;

  function showFilters() {
    const number = 5;
    const arr = categories.filter((_category, index) => index < number);
    setFiltersButton(arr);
  }

  function changeFilters({ target }) {
    const element = target.id;
    setToggle(!toggle);
    functionChangeFilter(element === 'All' ? '' : element);
    if (toggle) return functionChangeFilter('');
  }

  useEffect(() => {
    showFilters();
  }, [categories]);

  return (
    <Container>
      <Buttons
        type="button"
        onClick={ changeFilters }
        data-testid="All-category-filter"
        className="all-btn"
      >
        <img
          src={
            screen === '/bebidas' ? icons.bebidas.All : icons.comidas.All
          }
          alt="teste"
        />
      </Buttons>
      {filtersButtons.map((category, index) => (
        <Buttons
          type="button"
          key={ index }
          data-testid={ `${category.strCategory}-category-filter` }
          onClick={ changeFilters }
        >
          <img
            src={
              screen === '/bebidas'
                ? icons.bebidas[category.strCategory]
                : icons.comidas[category.strCategory]
            }
            alt="teste"
            id={ category.strCategory }
          />
        </Buttons>
      ))}
    </Container>
  );
}

ButtonFilters.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  functionChangeFilter: PropTypes.func.isRequired,
  setToggle: PropTypes.func.isRequired,
  toggle: PropTypes.bool.isRequired,
};

const Container = styled.div`display: flex;
  flex-flow: row wrap;
  justify-content: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8px;
`;

const Buttons = styled.button` background: none;
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 100%;
  color: inherit;
  cursor: pointer;
  font: inherit;
  margin: 8px;
  outline: inherit;

  img {
    width: 60px;
    height: 60px;
  }
`;
