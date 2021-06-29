import React from 'react';

function Button({ ...props }) {
  return (
    <button type="submit" { ...props } />
  );
}

export default Button;
