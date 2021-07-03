import React from 'react';
import { useParams } from 'react-router';

function Details() {
  const params = useParams();
  return (
    <h1>{console.log(params)}</h1>
  );
}

export default Details;
