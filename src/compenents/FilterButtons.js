import React, { useContext } from 'react';
import SearchbarContext from '../contexts/SearchbarContext';

function FilterButtons() {
  const { searchCategory, setSearchCategory, categories } = useContext(SearchbarContext);

  const handleFilter = ({ value }) => {
    if (searchCategory === value) {
      setSearchCategory('list');
    } else { setSearchCategory(value); }
  };

  console.log('Filter buttons');
  return (
    <section className="button-container">
      <button
        type="button"
        value="All"
        className="button"
        data-testid="All-category-filter"
        onClick={ () => setSearchCategory('list') }
      >
        All
      </button>
      {categories && categories.map(({ strCategory }, index) => (
        <button
          key={ index }
          type="button"
          value={ strCategory }
          className="button"
          data-testid={ `${strCategory}-category-filter` }
          onClick={ (e) => handleFilter(e.target) }
        >
          { strCategory }
        </button>
      ))}
    </section>
  );
}

export default FilterButtons;
