import React, { useState } from 'react';

export default function useLoading() {
  const [loading, setLoading] = useState(false);

  const renderLoading = (Component) => {
    if (loading) return <h1>Loading...</h1>;
    return Component;
  };

  return { loading, setLoading, renderLoading };
}
