import styled from 'styled-components';

const Container = styled.div`align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  max-width: 1120px;
  overflow: hidden;

  .componente1 {

    .recipe-info {
      align-items: center;
      display: flex;
      justify-content: space-evenly;
      margin: 1rem 0.7rem;

      h1 {
        align-self: center;
        display: flex;
        justify-self: center;
      }

      .icons {
        display: flex;
        gap: 1rem;
      }
    }

    h3 {
      color: #707070;
      display: block;
      justify-self: center;
      line-height: 1;
      margin: 0 auto;
      margin-block-end: 1em;
      margin-block-start: 1em;
      margin-inline-end: 0;
      margin-inline-start: 0;
      padding-right: 10px;
      text-align: center;
      text-transform: uppercase;
    }

    .img-container {

      img {
        border-radius: 8px;

        /* height: auto; */
        max-width: 90vw;
        object-fit: cover;
        overflow: hidden;

        /* width: 100%; */
      }
    }
  }

  .ingredient-list {
    align-items: flex-start;
    display: flex;
    justify-content: flex-start;
    margin-right: 4rem;
  }

  .instructions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 2.15rem;

    p {
      display: flex;
      flex-wrap: wrap;
      margin: 1rem;
      max-width: 640px;
    }
  }

  iframe {
    border: 0;
    margin: 0 auto 3.75rem;
    max-height: auto;
    max-width: 90vw;
  }

  /* .carousel-container {
    margin: 0 auto 2rem;

    div {
      margin-bottom: 2rem;
    }
  } */

  button {
    border: 0;
    border-radius: 8px;
    bottom: 0;
    cursor: pointer;
    font-weight: 600;
    gap: 2rem;
    height: 2.2rem;
    max-width: 200px;
    min-width: 180px;
    padding: 0 32px;
    position: fixed;
  }

  @media only screen and ( max-width : 1611 ) {
    align-items: center;
    margin: 0 auto;
    max-width: 820px;

    .instructions {

      p {
        max-width: 100vw;
        overflow: hidden;
      }
    }
  }

  @media only screen and ( max-width : 475px ) {
    align-items: center;
    margin: 0 auto;
    max-width: 90vw;

    .instructions {

      p {
        max-width: 100vw;
        overflow: hidden;
      }
    }
  }
`;

export default Container;
