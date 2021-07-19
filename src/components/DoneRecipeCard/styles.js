import styled from 'styled-components';

const DoneRecipeCardContainer = styled.div`margin: 8px 8px 32px;
  max-height: 500px;
  min-height: 450px;
  outline: 0;
  position: relative;
  width: 15.1rem;

  a {
    color: #30343b;
    font-weight: 600;
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

    img {
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

  .category {
    color: #737373;
    font-weight: 400;
    text-align: center;
    text-transform: uppercase;
  }

  .tag {
    color: #737373;
  }

  .icons-grid {
    align-items: center;
    display: flex;
    justify-content: center;
  }

  .recipe-info {
    align-items: center;
    display: flex;
    flex-flow: column nowrap;
    font-size: 1rem;
    justify-content: space-between;
    line-height: 1;
    margin: 0 auto 6px;
    padding-left: 10px;
    padding-right: 10px;
    z-index: 2;

    a {
      margin-top: 0;
    }
  }

  li {
    list-style: none;
  }
`;

export default DoneRecipeCardContainer;
