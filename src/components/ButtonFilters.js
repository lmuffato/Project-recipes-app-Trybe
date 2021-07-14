import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function ButtonFilters({ categories, functionChangeFilter,
  elementFilter, setToggle, toggle }) {
  const [filtersButtons, setFiltersButton] = useState([]);

  function showFilters() {
    const number = 5;
    const arr = categories.filter((_category, index) => index < number);
    setFiltersButton(arr);
  }

  function changeFilters({ target }) {
    const element = target.innerHTML;
    setToggle(!toggle);
    functionChangeFilter(element === 'All' ? '' : element);
    if (toggle === true) return functionChangeFilter('');
    console.log(elementFilter);
  }

  useEffect(() => {
    showFilters();
  }, [categories]);

  return (
    <Container>
      <Buttons type="button" onClick={ changeFilters }>All</Buttons>
      {filtersButtons.map((category, index) => (
        <Buttons
          type="button"
          key={ index }
          data-testid={ `${category.strCategory}-category-filter` }
          onClick={ changeFilters }
        >
          {category.strCategory}
        </Buttons>
      ))}
    </Container>
  );
}

ButtonFilters.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  functionChangeFilter: PropTypes.func.isRequired,
  elementFilter: PropTypes.string.isRequired,
  setToggle: PropTypes.func.isRequired,
  toggle: PropTypes.bool.isRequired,
};

const Container = styled.div`display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;

const Buttons = styled.button` background: none;
  background-color: rgb(214, 168, 40);
  border: none;
  border-radius: 6px;
  color: inherit;
  cursor: pointer;
  font: inherit;
  margin: 8px;
  outline: inherit;
  padding: 10px;
`;
