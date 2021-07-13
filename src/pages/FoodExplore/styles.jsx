import styled from 'styled-components';
import SharedContainerHeader from '../../styles/shared/ContainerHeader';
import SharedButton from '../../styles/shared/Button';

export const ContainerExploreFood = styled(SharedContainerHeader)`
  padding: var(--global-space);

  > header {
    > div {
      > h1 {
        font-size: 1.89rem;
      }
    }
  }

  > div {
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
  }
`;

export const ButtonFoodExplore = styled(SharedButton)`
  padding: 1rem;
  width: 190px;
`;
