import styled from 'styled-components';

const Container = styled.div`align-items: center;
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  .ingredient-list {
    align-items: flex-start;
    display: flex;
    justify-content: space-evenly;
    margin-right: 4rem;
  }

  .instructions {
    display: flex;
    flex-flow: column wrap;
    margin: 0 2rem auto;
    max-width: 820px;
  }

  iframe {
    border: 0;
    margin: 2.5rem auto;
  }
`;

export default Container;
