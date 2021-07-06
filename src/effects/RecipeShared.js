import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Copy from 'clipboard-copy';

export default function RecipeShared(state) {
  const history = useHistory();
  useEffect(() => {
    if (!state) return;
    const { pathname } = history.location;
    Copy(`http://localhost:3000${pathname}`);
  }, [state]);
}
