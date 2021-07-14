import styled from 'styled-components';

const ContainerHeader = styled.div`
  padding: 0 1.8rem 1rem 1.8rem;

  > header {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 71px;

    > div {
      > h1 {
        font-size: 2rem;
      }
    }
  }
`;

export default ContainerHeader;
