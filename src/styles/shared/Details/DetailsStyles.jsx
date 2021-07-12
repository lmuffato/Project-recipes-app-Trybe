import styled from 'styled-components';
import Button from '../Button';

export const MainContainerDetails = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  
  padding: var(--global-space);

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--red-first-color);
  }
`;

export const ContainerFood = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  align-items: center;

  > h1 {
    font-family: var(--font-second);
  }

  > h2 {
    font-family: var(--font-second);
    font-size: 1.5rem;
  }

  > img {
    width: 300px;
  }

  > div {
    display: flex;
    gap: 0.8rem;

    > button {
      background: none;
      border: none;
      color: var(--red-first-color);
      font-size: 2rem;
      outline: none;

      &:active {
        outline: none;
      }

      &:hover {
        outline: none;
      }
    }
  }
`;

export const ContainerRecipes = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  > section {
    > span,
    > li {
      font-family: var(--font-second);
    }

    > ul {
      list-style-type: none;
    }
  }
`;

export const ContainerCarousel = styled.section`
  .carousel-inner {
    width: 71%;
    margin: 0 auto;

    .carousel-indicators {
      color: red;
    }

    .carousel-caption {
      > span {
        background: #ff2637a1;
        color: #fff;
        border-radius: 8px;
        padding: 0.6rem;
        width: 40%;
        font-weight: bold;
      }
    }
  }
`;

export const ButtonDetails = styled(Button)`
  padding: 1rem;
`;
