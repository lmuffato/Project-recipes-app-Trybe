import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';

function NotFound() {
  return (
    <Container>
      <Header />
      Not Found
      <Footer />
    </Container>
  );
}

export default NotFound;
