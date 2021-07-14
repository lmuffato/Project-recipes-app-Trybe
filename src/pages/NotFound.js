import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="not-found">
      <p>Not Found</p>
      <Link to="/">Login</Link>
    </div>
  );
}
