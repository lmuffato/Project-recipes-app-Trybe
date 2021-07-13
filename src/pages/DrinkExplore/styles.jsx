import styled from 'styled-components';
import SharedContainerHeader from '../../styles/shared/ContainerHeader';
import SharedButton from '../../styles/shared/Button';

export const ContainerExploreDrink = styled(SharedContainerHeader)`
  padding: var(--global-space);
  
  > div {
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
  }
`;

export const ButtonDrinkExplore = styled(SharedButton)`
  padding: 1rem;
  width: 190px;
`;
