import React, { useState } from 'react';
import { arrayOf, string } from 'prop-types';
import { connect } from 'react-redux';
import { getCategories } from '../actions/recipes';

function Recipes(props) {
  const { categories, fetchCategories } = props;

  useState(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      { categories.map((category) => (
        <div key={ category }>
          <h3>{ category }</h3>
        </div>
      )) }
    </div>
  );
}

Recipes.propTypes = {
  categories: arrayOf(string),
}.isRequired;

const mapStateToProps = (state) => ({
  categories: state.recipes.categories,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => dispatch(getCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
