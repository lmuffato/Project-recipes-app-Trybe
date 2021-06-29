import { useState, useEffect } from 'react';

function usePersistedState(key, initialState) {
  const [state, setState] = useState(() => {
    const storagedValue = localStorage.getItem(key);

    if (storagedValue) {
      return JSON.parse(storagedValue);
    }
    return initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export default usePersistedState;
