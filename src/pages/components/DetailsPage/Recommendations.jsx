import React from 'react';
import { arrayOf, object } from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function Recommendations(props) {
  const { recommendations } = props;
  return (
    <Container>
      { recommendations.map((recommendation, index) => (
        <Row key={ index } data-testid={ `${index}-recomendation-card` }>
          { recommendation.name }
        </Row>
      )) }
    </Container>
  );
}

Recommendations.propTypes = {
  recommendations: arrayOf(object),
}.isRequired;

export default Recommendations;
