import styled from 'styled-components';

const HeaderContainer = styled.header` align-items: center;
  border-bottom: 1px solid #e2e2e2;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 24px;

  > button, .container > button {
    align-self: center;
    background: inherit;
    border: 0;
    max-height: 40px;
    max-width: 40px;
  }
`;

export default HeaderContainer;
