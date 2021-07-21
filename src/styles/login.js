import styled from 'styled-components';

export const LoginContainer = styled.div`align-items: center;
  background: #fdfefb;
  display: flex;
  flex-direction: column;
  font-family: Poppins , sans-serif;
  height: 100vh;
  justify-content: center;
  overflow-x: hidden;
  overflow-y: scroll;
  width: 100vw;


  @media ( min-width : 1024px ) {

    .page-grid {
      display: grid;
      grid-template-columns: repeat(10, minmax(0, 1fr));
      margin: 5rem;
      max-width: 1200px;

      aside {
        align-self: center;
        grid-column-start: 1;
        justify-self: baseline;
        margin-left: 2rem;
        margin-right: 3rem;
        padding-right: 8rem;
      }

      .separator {
        border-right: 1px solid #e6e6e6;
      }
    }
  }


  @media only screen and ( min-width : 900px ) {
    flex-direction: row;
    max-width: 100vw;
  }

`;

export const Container = styled.div`align-items: center;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 1120px;
  overflow-x: hidden;
  overflow-y: scroll;
  padding-top: 2rem;

  div {
    align-self: center;
    background: inherit;
    display: flex;
    margin: 0 auto;
    padding-bottom: 6rem;

    object {
      animation: shake 1s infinite ease;
      width: 100%;
    }

    @keyframes shake {

      0% {
        transform: rotate(5deg);
      }

      50% {
        transform: rotate(-5deg);
      }

      100% {
        transform: rotate(5deg);
      }
    }
  }


  label {
    color: #289ea8;

    input {
      background: #ebf4f2;
      border: 0;
      border-radius: 8px;
      height: 50px;
      padding: 0 16px;
      width: 100%;
    }

    & + label {
      margin-top: 1.5rem;
    }
  }

  button {
    align-self: center;
    background: #289ea8;
    border: 0;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    font-family: Poppins , sans-serif;
    font-size: 1rem;
    font-weight: 500;
    height: 50px;
    justify-content: center;
    margin: 0 auto;
    margin-top: 16px;
    max-width: 120px;
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

  @media ( min-width : 768px ) {
    border-color: rgba(61, 73, 92, var(1));
    border-left-width: 1.5px;
    padding-left: 2.5rem;
  }

  @media only screen and ( min-width : 900px ) {
    align-items: center;
    display: inline-block;
    justify-content: center;

    div {
      flex: 7;
      margin: 0 auto;

      .logo-letmeeat {
        margin: 0 auto;
      }
    }

    label {
      flex: 8;

      input {
        margin-bottom: 1.5rem;
      }
    }
  }

  @media ( min-width : 1024px ) {
    grid-column: span 6/ span 6;
    margin-left: 3rem;
    margin-right: auto;
    padding-left: 3rem;
  }

  @media ( min-width : 1280px ) {
    padding-left: 5rem;
  }
`;
