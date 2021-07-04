import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';

function Footer() {
  return (
    <Container as="footer" data-testid="footer">
      <Row>
        <Col>
          <img
            src={ drinkIcon }
            alt="Drink icon"
            data-testid="drinks-bottom-btn"
          />
        </Col>
        <Col>
          <img
            src={ exploreIcon }
            alt="Explore icon"
            data-testid="explore-bottom-btn"
          />
        </Col>
        <Col>
          <img
            src={ mealIcon }
            alt="Meal icon"
            data-testid="food-bottom-btn"
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
