import styled from 'styled-components';
import SharedContainerHeader from '../../styles/shared/ContainerHeader';
import SharedButton from '../../styles/shared/Button';

export const ContainerExploreDrink = styled(SharedContainerHeader)`
  > div {
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
  }

  > header {
    > div {
      > h1 {
        font-size: 1.7rem;
        margin-top: 1.2rem;
      }
    }
  }
`;

export const ButtonDrinkExplore = styled(SharedButton)`
  padding: 1rem;
  width: 190px;
`;
