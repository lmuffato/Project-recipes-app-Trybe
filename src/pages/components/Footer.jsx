import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  return (
    <Container as="footer" className="footer-menu" data-testid="footer">
      <Row>
        <Col>
          <Link to="/bebidas">
            <img
              src={ drinkIcon }
              alt="Drink icon"
              data-testid="drinks-bottom-btn"
            />
          </Link>
        </Col>
        <Col>
          <Link to="/explorar">
            <img
              src={ exploreIcon }
              alt="Explore icon"
              data-testid="explore-bottom-btn"
            />
          </Link>
        </Col>
        <Col>
          <Link to="/comidas">
            <img
              src={ mealIcon }
              alt="Meal icon"
              data-testid="food-bottom-btn"
            />
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
