import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Copy from 'clipboard-copy';

export default function RecipeShared(state, id, type) {
  const history = useHistory();
  useEffect(() => {
    const copyUrl = async () => {
      if (!state) return;
      const { pathname } = history.location;
      if (pathname.includes('in-progress') && pathname.includes('comidas')) {
        const regExp = /[0-9]/gi;
        const getId = history.location
          .pathname.match(regExp).reduce((acc, item) => acc + item, '');
        return Copy(`http://localhost:3000/comidas/${getId}`);
      }
      if (pathname.includes('in-progress') && pathname.includes('bebidas')) {
        const regExp = /[0-9]/gi;
        const getId = history.location
          .pathname.match(regExp).reduce((acc, item) => acc + item, '');
        return Copy(`http://localhost:3000/bebidas/${getId}`);
      }
      if (pathname.includes('favoritas') && type === 'comida') {
        return Copy(`http://localhost:3000/comidas/${id}`);
      }
      if (pathname.includes('favoritas') && type === 'bebida') {
        return Copy(`http://localhost:3000/bebidas/${id}`);
      }
      Copy(`http://localhost:3000${history.location
        .pathname}`);
    };
    copyUrl();
  }, [state]);
}
