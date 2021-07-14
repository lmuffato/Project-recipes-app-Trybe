import styled from 'styled-components';
import SharedButton from '../../styles/shared/Button';
import SharedContainerHeader from '../../styles/shared/ContainerHeader';

export const ContainerProfile = styled(SharedContainerHeader)`
  text-align: center;

  > h1 {
    font-size: 1.5rem;
    color: var(--red-first-color);
  }

  > div {
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
  }
`;

export const ButtonProfile = styled(SharedButton)`
  padding: 1rem;
  width: 190px;
`;
