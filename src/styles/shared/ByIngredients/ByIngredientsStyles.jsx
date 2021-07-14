import styled from 'styled-components';
import SharedContainerHeader from '../ContainerHeader';
import ContainerRecipeCards from '../ContainerRecipeCards';

export const ContainerExploreByIngredients = styled(SharedContainerHeader)`
  > header {
    > div {
      h1 {
        font-size: 1.4rem;
        margin-top: 2.2rem;
      }
    }
  }
`;

export const MainContainerIngredientsCards = styled(ContainerRecipeCards)`
  padding: 0;
  margin: 3.7rem 0;
`;
