import styled from 'styled-components';

const Container = styled.div`align-items: center;
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  .instructions {
    display: flex;
    flex-flow: column wrap;
    margin: 0 30px auto;
    max-width: 820px;
  }
`;

export default Container;
