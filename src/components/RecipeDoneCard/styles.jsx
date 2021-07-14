import styled from 'styled-components';

export const ContainerRecipeCardInfos = styled.div`
  display: flex;
  justify-content: center;
`;

export const ContainerInfos = styled.div`
  width: 90%;
  padding-left: 1rem;

  display: flex;
  flex-direction: column;

  font-family: var(--font-third);
  font-weight: bold;  
`;

export const ContainerButton = styled.div`
  width: 10%;

  display: flex;
  justify-content: center;
  align-items: center;

  > button {
    border: none;
    background: none;
    color: var(--red-first-color);
    font-size: 1.6rem;
    outline: none;

    &:active {
      outline: none;
    }

    &:hover {
      outline: none;
    }
  }
`;
