import styled from 'styled-components';

const FooterContainerButtons = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100vw;
  background: var(--red-second-color);

  display: flex;
  justify-content: space-around;

  > button {
    border: none;
    background: none;
    font-size: 2.5rem;
    
    > svg {
      color: #FFF;
    }
  }
`;

export default FooterContainerButtons;
