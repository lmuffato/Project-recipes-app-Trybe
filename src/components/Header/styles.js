import styled from 'styled-components';

const HeaderContainer = styled.header`align-items: center;

  /* background: #fff5f0; */
  background: #fdfefb;
  border-bottom: 1px solid #e2e2e2;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0 auto;
  max-width: 1120px;
  padding: 24px;

  button, .container > button {
    align-self: center;
    background: inherit;
    border: 0;
    cursor: pointer;
    max-height: 60px;
    max-width: auto;
    padding-right: 0.8rem;
  }

  .title-container {
    align-items: center;
    display: flex;
    flex-wrap: wrap;

    /* flex: 2; */
    justify-content: center;
    margin: 0 auto;
    max-height: auto;
    max-width: 60vw;

    img {
      align-self: center;
      height: auto;
    }

    h1 {
      align-self: flex-end;
      font-size: 1.9rem;
    }
  }

  .container {
    align-items: center;
    background: inherit;
    border: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: space-around;
    margin: 0 auto;
    max-width: 30vw;
    padding: 10px;

    button {
      border: 0;
      cursor: pointer;
      max-height: 60px;
      max-width: auto;


      & + button {
        margin-right: 0.4rem;
      }
    }
  }

  @media only screen and ( max-width : 650px ) {
    padding-left: 8px;

    .title-container {
      margin: 0 auto;
      max-width: 65vw;
      padding-bottom: 1rem;

      h1 {
        align-self: center;
        display: flex;
        font-size: 1.375rem;
        justify-self: center;
        margin: 0 auto;
      }
    }

    .container {
      gap: 15px;

      button {
        height: auto;
        width: 25px;
      }
    }
  }
`;

export const LogoContainer = styled.div`align-items: center;
  align-self: center;
  background: inherit;
  display: flex;
  max-height: auto;
  max-width: 18rem;
  width: 16.5rem;

  img {
    width: 100%;
  }

  /* input {
    height: auto;
    width: 25rem;
  } */
`;

export default HeaderContainer;
