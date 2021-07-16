import styled from 'styled-components';

const CardContainer = styled.div`margin: 8px 8px 32px;
  min-height: 316px;
  outline: 0;
  position: relative;
  width: 14.7rem;

  .img-wrapper {
    border-radius: 4px;
    height: 0;
    overflow: hidden;
    padding-bottom: 100%;
    position: relative;

    img {
      bottom: auto;
      height: 100%;
      left: auto;
      min-width: 100%;
      object-fit: cover;
      position: absolute;
      right: 50%;
      top: 0;
      transform: translateX(50%);
      width: auto;
    }
  }

  .card-info {
    align-content: normal;
    align-items: normal;
    display: flex;
    flex-wrap: nowrap;
    font-size: 1rem;
    justify-content: normal;
    margin: 10px auto 6px;
    z-index: 2;
  }

  @media only screen and ( max-width : 767px ) {
    align-items: center;
    margin: 0 auto;
  }
`;

export default CardContainer;

export const RecommendationCardsContainer = styled.div`margin: 8px 8px 32px;
  min-height: 316px;
  outline: 0;
  position: relative;
  width: 10.7rem;

  .img-wrapper {
    border-radius: 4px;
    height: 0;
    overflow: hidden;
    padding-bottom: 100%;
    position: relative;

    img {
      bottom: auto;
      height: 100%;
      left: auto;
      min-width: 100%;
      object-fit: cover;
      position: absolute;
      right: 50%;
      top: 0;
      transform: translateX(50%);
      width: auto;
    }
  }

  .card-info {
    align-content: normal;
    align-items: normal;
    display: flex;
    flex-wrap: wrap;
    justify-content: normal;
    margin: 10px auto 6px;
    z-index: 2;

    span {
      font-family: Poppins , sans-serif;
      font-size: 0.85rem;
      margin: 0 auto;
      text-transform: uppercase;
    }

    .card-info-paragraph {
      align-self: center;
      margin-left: 30px;
      text-align: center;
    }

    img {
      align-self: center;
      height: auto;
      justify-self: baseline;
      max-width: 30px;
    }


    div {
      justify-content: flex-end;

      p {
        color: #a6a6a6;
        justify-self: flex-end;
        margin: 0 auto;
        text-transform: uppercase;
      }

    }
  }

  @media only screen and ( max-width : 370px ) {
    margin: 0 auto;
    width: 10.3rem;
  }

  @media only screen and ( min-width : 400px ) {
    width: 12rem;
  }

  @media only screen and ( min-width : 470px ) {
    width: 15rem;
  }

  @media only screen and ( min-width : 500px ) {
    width: 16rem;
  }

  @media only screen and ( min-width : 650px ) {
    width: 18rem;


    img {
      align-self: center;
      height: auto;
      max-width: 40px;
    }
  }

  @media only screen and ( min-width : 700px ) {
    max-width: 40rem;
    min-width: 25rem;
  }

`;
