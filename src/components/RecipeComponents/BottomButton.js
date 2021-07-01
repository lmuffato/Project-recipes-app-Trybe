import React from 'react';
import Button from 'react-bootstrap/Button';

export default function BottomBtn() {
  return (
    <Button
      type="button"
      data-testid="start-recipe-btn"
      variant="secondary"
      className="startBtn"
    >
      Iniciar Receita
    </Button>
  );
}
