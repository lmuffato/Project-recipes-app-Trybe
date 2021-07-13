import styled from 'styled-components';
import SharedContainerHeader from '../ContainerHeader';
import ContainerRecipeCards from '../ContainerRecipeCards';

export const ContainerExploreByIngredients = styled(SharedContainerHeader)`
  padding: var(--global-space);
`;

export const MainContainerIngredientsCards = styled(ContainerRecipeCards)`
  padding: 0;
  margin: 3.7rem 0;
`;
