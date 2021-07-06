import styled from 'styled-components';

const Container = styled.div`align-items: center;
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  .componente1 {

    .recipe-info {
      align-items: center;
      display: flex;
      flex-direction: column;

      h1 {
        align-self: center;
        display: flex;
        justify-self: center;
      }

      .img-container {
        max-width: 200px;
      }
    }
  }

  .ingredient-list {
    align-items: flex-start;
    display: flex;
    justify-content: space-evenly;
    margin-right: 4rem;
  }

  .instructions {
    display: flex;
    flex-flow: column wrap;
    margin: 2rem auto;
    max-width: 820px;
  }

  iframe {
    border: 0;
    margin: 2.5rem auto;
  }

  button {
    bottom: 0;
    position: fixed;
  }
`;

export default Container;
