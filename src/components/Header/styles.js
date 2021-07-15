import styled from 'styled-components';

const HeaderContainer = styled.header`align-items: space-around;
  background: #fdfefb;
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  /* max-width: 1420px; */
  margin: 0 auto;
  max-width: 990px;
  padding: 20px;

  button, .container > button {
    align-self: center;
    background: inherit;
    border: 0;
    cursor: pointer;
    padding-right: 0.7rem;
  }

  .title-container {
    align-items: center;
    display: flex;
    flex: 3;
    flex-direction: column;
    justify-content: center;
    line-height: 0.8;
    max-width: 68vw;

    img {
      align-self: center;
      height: auto;
    }

    h1 {
      align-self: flex-end;
      font-family: Poppins , sans-serif;
      font-size: 1.5rem;
      -webkit-font-smoothing: antialiased;
      font-weight: 200;
      margin: 0 auto;
      padding-left: 5px;
    }
  }

  .container {
    display: flex;
    flex: 1;
    justify-content: space-evenly;
    margin: 0 auto;
    width: 100%;

    button {
      align-self: center;
      border: 0;
      cursor: pointer;

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

    /* .container {
      display: flex;
    } */

    .title-container {
      margin: 0 auto;
      padding-bottom: 1rem;

      img {
        align-self: center;
        justify-self: center;
        position: relative;
      }

      .header-title-container {
        margin: 0 6px 2px auto;

        h1 {
          align-self: center;
          display: flex;
          flex-wrap: wrap;
          font-size: 1.2rem;
          justify-self: center;
          text-align: center;
        }
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
      max-width: 65vw;
      padding-bottom: 1rem;

      h1 {
        align-self: flex-end;
        display: flex;
        font-size: 1.2rem;
        justify-self: flex-end;

        /* margin: 0 auto; */
        max-width: 55vw;

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
