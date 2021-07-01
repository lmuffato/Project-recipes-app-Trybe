import React, { useEffect } from 'react';
import { arrayOf, string } from 'prop-types';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getMealsCategories } from '../../actions/meals';
import { getDrinksCategories } from '../../actions/drinks';
import 'bootstrap/dist/css/bootstrap.min.css';

function CategoriesBtn(props) {
  const { categories, fetchMealsCategories, fetchDrinksCategories, type } = props;

  useEffect(() => {
    if (type === 'meals') fetchMealsCategories();
    if (type === 'drinks') fetchDrinksCategories();
  }, [fetchMealsCategories, fetchDrinksCategories, type]);

  return (
    <Container className="categories-container">
      <Row xs="3" md="4" lg="6">
        <Col>
          <Button
            variant="outline-dark"
            data-testid="all-category-filter"
            type="button"
          >
            All
          </Button>
        </Col>
        { categories.map((category) => (
          <Col key={ category }>
            <Button
              variant="outline-dark"
              data-testid={ `${category}-category-filter` }
              type="button"
            >
              { category }
            </Button>
          </Col>
        )) }
      </Row>
    </Container>
  );
}

CategoriesBtn.propTypes = {
  categories: arrayOf(string),
}.isRequired;

const mapStateToProps = (state) => ({
  categories: state.meals.categories,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMealsCategories: () => dispatch(getMealsCategories()),
  fetchDrinksCategories: () => dispatch(getDrinksCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesBtn);
