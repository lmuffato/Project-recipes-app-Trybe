import React, { useEffect } from 'react';
import { fetchRandomFood } from '../services/mealAPI';

export default function DetalhesComidas() {
  useEffect(() => {
    fetchRandomFood().then((res) => console.log(res));
  }, []);

  return (
    <div>
      Bebida aleatória
    </div>
  );
}
