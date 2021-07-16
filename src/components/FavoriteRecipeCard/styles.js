import styled from 'styled-components';

const FavRecipeCardContainer = styled.div`margin: 8px 8px 32px;
  max-height: 400px;
  outline: 0;
  position: relative;
  width: 15.1rem;

  a {
    color: #289ea8;
    text-decoration: none;
  }

  button {
    align-self: center;
    background: inherit;
    border: 0;
  }

  .img-wrapper {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
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

  .recipe-category {
    color: #a6a6a6;
    text-align: center;
    text-transform: uppercase;
  }

  .icons-grid {
    align-items: center;
    display: flex;
    justify-content: center;

    button {

      img {
        color: #289ea8;
      }
    }
  }

  .recipe-info {
    align-items: center;
    /* background: #289ea8; */
    /* background: #ebf4f2; */
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    color: #289ea8;
    display: flex;
    flex-flow: column nowrap;
    font-size: 1rem;
    justify-content: space-between;
    line-height: 1;
    margin: 0 auto 6px;
    padding-left: 10px;
    padding-right: 10px;
    z-index: 2;
  }
`;

export default FavRecipeCardContainer;
