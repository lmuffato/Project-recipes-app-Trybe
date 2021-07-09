import styled from 'styled-components';

export const FormContainer = styled.form`
  height: 100vh;
  width: 100%;
  padding: var(--global-space);

  form {
    display: flex;
    flex-direction: column;
    gap: 5.5rem;
    align-items: center;
    height: 100%;
    width: 100%;
  }
`;

export const ContainerLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > img {
    width: 128px;
  }

  > h1 {
    font-weight: bold;
    font-size: 3rem;
    font-family: var(--font-first);
    color: #ff2637;
  }
`;

export const ContainerInputs = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 100%;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
  }
`;

export const Input = styled.input`
  outline: none;
  background: #ffeee1;
  border: 1px solid #80808063;
  border-radius: 12px;
  padding: 0.8rem;
  font-size: 0.9rem;
  letter-spacing: 1px;
  width: 75%;
  box-shadow: 0 3px 6px 0 rgb(0 0 0 / 10%);
`;

export const StyledButton = styled.button`
  border: none;
  color: #FFF;
  background: #fc4c4a;
  font-size: 0.9rem;
  cursor: pointer;
  margin: 0 auto;
  width: 75%;
  border-radius: 12px;
  padding: 0.8rem;
  font-weight: bold;
  transition: all 0.3s;

  &:disabled {
    opacity: 30%;
  }
`;
