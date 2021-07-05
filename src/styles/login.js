import styled from 'styled-components';

export const LoginContainer = styled.div`align-items: center;
  background: #0fa36b; /* provisorio, utilizando background que já vem no projeto */
  display: flex;
  flex-direction: column;
  font-family: sans-serif;
  font-weight: 600;
  height: 100vh;
  justify-content: center;
  padding-top: 10%;
  width: 100%;
`;

export const Container = styled.div`display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: -10px;
  max-width: 400px;
  padding-right: 2rem;
  width: 70vw;

  label {
    color: white;

    input {
      background: white;
      border: 0;
      border-radius: 8px;
      height: 50px;
      padding: 0 16px;
      width: 100%;
    }

    & + label {
      margin-top: 2rem;
    }
  }

  button {
    align-self: center;
    border: 0;
    border-radius: 8px;
    color: black;
    cursor: pointer;
    font-size: 16px;
    height: 50px;
    justify-content: center;
    margin: 0 auto;
    margin-top: 16px;
    max-width: 100px;
    padding: 0 32px;
    text-align: center;
    transition: filter 0.2s;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    &:not( :disabled ):hover {
      filter: brightness(0.9);
    }
  }
`;
