import React from 'react';
import '../style/NotFound.css';
import logologin from '../images/logologin.jpg';

export default function NotFound() {
  return (
    <div>
      <img src={ logologin } alt="Not Found Page Logo" />
      <h1 className="not-found">
        Error 404
      </h1>
      <br />
      <h2>Page not Found</h2>
      <br />
      <h3>
        You must cook alone today :(
      </h3>
    </div>
  );
}
