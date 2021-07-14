import styled from 'styled-components';
import SharedButton from '../../styles/shared/Button';
import SharedContainerHeader from '../../styles/shared/ContainerHeader';

export const ContainerExplore = styled(SharedContainerHeader)`
  > div {
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
  }
`;

export const ButtonExplore = styled(SharedButton)`
  padding: 1rem;
  width: 190px;
`;
