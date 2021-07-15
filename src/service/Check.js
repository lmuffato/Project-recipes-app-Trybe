import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { StorageFood, StorageDrink } from './Favorite';

export function checkFavoriteFood(recip) {
  if (localStorage.favoriteRecipes) {
    if (StorageFood(recip) === true) {
      return blackHeartIcon;
    }
    return whiteHeartIcon;
  }
  return whiteHeartIcon;
}

export function checkFavoriteDrink(recip) {
  if (localStorage.favoriteRecipes) {
    if (StorageDrink(recip) === true) {
      return blackHeartIcon;
    }
    return whiteHeartIcon;
  }
  return whiteHeartIcon;
}
