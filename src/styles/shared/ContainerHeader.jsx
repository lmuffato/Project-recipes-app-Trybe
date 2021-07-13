import styled from 'styled-components';

const ContainerHeader = styled.div`
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
