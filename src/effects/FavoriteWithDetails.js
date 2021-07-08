import { useEffect, useContext } from 'react';
import FavoritesContext from '../context/FavoritesContext';
import { ApiRecipeDetail } from '../services/theMealAPI';
import { ApiDetailsById } from '../services/theCockTailAPI';

const FavoriteWithDetails = (setAllWithDetails) => {
  const { allFavorites } = useContext(FavoritesContext);

  useEffect(() => {
    const fetchItems = () => {
      let allItems = [];
      allFavorites.forEach(async (item) => {
        if (item.type === 'comida') {
          const request = await ApiRecipeDetail(item.id);
          const { meals } = request;
          allItems = [...allItems, meals[0]];
          setAllWithDetails(allItems);
        }
        if (item.type === 'bebida') {
          const request = await ApiDetailsById(item.id);
          const { drinks } = request;
          allItems = [...allItems, drinks[0]];
          setAllWithDetails(allItems);
        }
      });
    };
    fetchItems();
  }, [allFavorites]);
};

export default FavoriteWithDetails;
