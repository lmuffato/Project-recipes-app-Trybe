import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Copy from 'clipboard-copy';

export default function RecipeShared(state) {
  const history = useHistory();
  const regExp = /[0-9]/gi;
  const getId = history.location
    .pathname.match(regExp).reduce((acc, item) => acc + item, '');
  useEffect(() => {
    if (!state) return;
    const { pathname } = history.location;
    if (pathname.includes('in-progress') && pathname.includes('comidas')) {
      return Copy(`http://localhost:3000/comidas/${getId}`);
    }
    if (pathname.includes('in-progress') && pathname.includes('bebidas')) {
      return Copy(`http://localhost:3000/bebidas/${getId}`);
    }
    Copy(`http://localhost:3000/${getId}`);
  }, [state]);
}
