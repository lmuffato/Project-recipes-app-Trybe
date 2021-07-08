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
        const request = await ApiDetailsById(item.id);
        const { drinks } = request;
        const requestMeal = await ApiRecipeDetail(item.id);
        const { meals } = requestMeal;
        if (!meals) {
          allItems = [...allItems, drinks[0]];
          setAllWithDetails(allItems);
        }
        if (!drinks) {
          allItems = [...allItems, meals[0]];
          setAllWithDetails(allItems);
        }
      });
    };
    fetchItems();
  }, [allFavorites]);
};

export default FavoriteWithDetails;
