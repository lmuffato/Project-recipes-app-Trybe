import styled from 'styled-components';

export const Container = styled.footer`
  background-color: #C4C4C4;
  position: fixed;
  bottom: 0;
  width: 100%;
`;

export const Content = styled.ul`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  margin: 0 auto;
  max-width: 720px;

  li {
    list-style: none;
  }
`;
