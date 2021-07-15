import styled from 'styled-components';

const HeaderContainer = styled.header`align-items: space-around;

  /* background: #fff5f0; */
  background: #fdfefb;
  border-bottom: 1px solid #e2e2e2;
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  /* margin: 0 auto; */

  /* max-height: 30vh; */
  max-width: 1420px;
  padding: 20px;

  button, .container > button {
    align-self: center;
    background: inherit;
    border: 0;
    cursor: pointer;
    max-height: 4vh;
    max-width: auto;
    padding-right: 0.7rem;
  }

  .title-container {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: 0.8;

    /* max-height: 18vh; */
    max-width: 68vw;

    img {
      align-self: center;
      height: auto;
    }

    h1 {
      align-self: flex-end;
      font-family: Poppins , sans-serif;
      font-size: 1.7rem;
      -webkit-font-smoothing: antialiased;
      font-weight: 200;
      margin: 0 auto;
    }
  }

  .container {
    align-items: center;
    border: 0;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    max-width: 18vw;
    padding: 10px;

    button {
      align-self: center;
      border: 0;
      cursor: pointer;
      height: 60px;

      img {
        display: flex;
        height: 100%;
      }


      & + button {
        margin-right: 0.1rem;
      }
    }
  }

  @media only screen and ( max-width : 650px ) {
    gap: 2rem;

    .container {
      display: flex;
    }

    .title-container {

      /* max-height: 18vh;
      max-width: 68vw; */
      padding-bottom: 1rem;

      img {
        margin: 0 auto;
      }

      h1 {
        align-self: center;
        display: flex;
        font-size: 1.2rem;
        justify-self: center;
        margin: 0 0.5rem auto;
        text-align: center;
      }
    }


  }
`;

export const LogoContainer = styled.div`align-items: center;
  align-self: center;
  background: inherit;
  display: flex;
  max-height: auto;
  max-width: 70vw;

  img {
    width: 100%;
  }

  @media only screen and ( max-width : 650px ) {

    /* padding-left: 8px; */
    .title-container {
      margin: 0 auto;
      max-width: 54vw;
      padding-bottom: 1rem;

      h1 {
        align-self: center;
        display: flex;
        font-size: 1.2rem;
        justify-self: center;
        margin: 0 auto;
        max-width: 54.362vw;

        /* max-width: 70vw; */

        /* min-width: 50vw; */
        text-align: center;
      }
    }

  }

  @media only screen and ( min-width : 1240px ) {

    .title-container {
      max-height: 30vh;
      max-width: 60vw;
    }

    .container {

      button {
        height: 2.5rem;
        max-height: 10vh;
      }
    }
  }

  /* input {
    height: auto;
    width: 25rem;
  } */
`;

export default HeaderContainer;
