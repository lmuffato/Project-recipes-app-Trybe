import styled from 'styled-components';

export const ContainerRecipeCardInfos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  > span {
    font-family: var(--font-third);
    font-weight: bold;
  }
`;

export const ContainerShareAndFavorite = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  
  > button {
    outline: none;

    &:active {
      outline: none;
    }

    &:hover {
      outline: none;
    }

    border: none;
    background: none;
    color: var(--red-first-color);
    font-size: 1.6rem;
  }
`;
