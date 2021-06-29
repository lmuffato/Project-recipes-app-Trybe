import React from 'react';
import { Button } from 'react-bootstrap';

export default () => (
  <header className="header-container">
    <Button data-testid="profile-top-btn" />
    <h1 data-testid="page-title">Comidas</h1>
    <Button data-testid="search-top-btn" />
  </header>
);
