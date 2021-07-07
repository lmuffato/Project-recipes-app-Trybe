import styled from 'styled-components';

const Container = styled.div`
  label {
    display: block;

    & + input[type=checkbox]:checked {
      color: red;
      text-decoration: line-through;
    }
  }
`;

export default Container;
