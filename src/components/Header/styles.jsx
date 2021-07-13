import styled from 'styled-components';
import SharedInput from '../../styles/shared/Input';
import SharedButton from '../../styles/shared/Button';

export const ContainerMainInfos = styled.div`
  text-align: center;

  > h1 {
    font-family: var(--font-second);
    font-size: 2.5rem;
    color: var(--red-first-color);
    margin: 1rem 0;
  }
`;

export const ButtonProfile = styled.button`
  position: ${({ searchIcon }) => (searchIcon ? 'absolute' : 'none')};
  left: 1.8rem;
  top: 1px;

  background: none;
  border: none;

  font-size: 2rem;
  color: var(--red-first-color);

  &:active {
    outline: none;
  }

  &:hover {
    outline: none;
  }
`;

export const ButtonSearch = styled.button`
  position: absolute;
  right: 1.8rem;
  top: 0;

  color: var(--red-first-color);
  background: none;
  font-size: 2rem;
  border: none;

  &:active {
    outline: none;
  }

  &:hover {
    outline: none;
  }
`;

export const Input = styled(SharedInput)``;

export const ContainerShowSearch = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  padding: var(--global-space);

  > div {
    display: flex;
    gap: 1rem;

    > label {
      display: flex;
      height: 19px;
      align-items: center;
      gap: 0.2rem;
    }
  }
`;

export const Button = styled(SharedButton)`
  padding: 0.6rem;
`;
