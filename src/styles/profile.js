import styled from 'styled-components';

const Wrapper = styled.section`align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 40px;

  strong {
    margin: 30px auto;
  }

  a {
    text-decoration: none;

    & + a {
      margin-bottom: 20px;
      margin-top: 20px;
    }
  }

  button {
    align-items: center;
    border: 0;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    font-weight: 600;
    gap: 20px;
    height: 40px;
    justify-content: center;
    margin-top: auto;
    max-width: 200px;
    min-width: 180px;
    padding: 0 32px;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    &:not( :disabled ):hover {
      filter: brightness(0.9);
    }
  }

`;

export default Wrapper;
