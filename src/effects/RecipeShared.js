import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Copy from 'clipboard-copy';

export default function RecipeShared(state) {
  const history = useHistory();
  useEffect(() => {
    if (!state) return;
    const { pathname } = history.location;
    console.log(pathname);
    Copy(`http://localhost:3000${pathname}`);
  }, [state]);
}
