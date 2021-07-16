import styled from 'styled-components';

const FavRecipeCardContainer = styled.div`margin: 8px 8px 32px;
  min-height: 216px;
  outline: 0;
  position: relative;
  width: 14.7rem;

  a {
    text-decoration: none;
  }

  button {
    align-self: center;
    background: inherit;
    border: 0;
  }

  .img-wrapper {
    border-radius: 4px;
    height: 0;
    overflow: hidden;
    padding-bottom: 100%;
    position: relative;

    .img-banner {
      bottom: auto;
      height: 100%;
      left: auto;
      min-width: 100%;
      object-fit: cover;
      position: absolute;
      right: 50%;
      top: 0;
      transform: translateX(50%);
      width: auto;
    }
  }
`;

export default FavRecipeCardContainer;
