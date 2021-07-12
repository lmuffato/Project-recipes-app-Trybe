import styled from 'styled-components';
import SharedInput from '../../styles/shared/Input';
import SharedButton from '../../styles/shared/Button';

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
    color: var(--red-first-color);
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

export const Input = styled(SharedInput)`
  padding: 0.8rem;
  font-size: 0.9rem;
  width: 75%;
`;

export const StyledButton = styled(SharedButton)`
  width: 75%;
  padding: 0.8rem;
  font-size: 0.9rem;
`;
