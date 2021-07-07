import styled from 'styled-components';

const CarouselWrapper = styled.div`background-color: white;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  margin: 0 auto;
  max-width: calc(90vw);
  scroll-behavior: smooth;
  width: 100%;

  .title-wrapper {
    border: 0;
    font: inherit;
    font-size: 1em;
    margin: 0;
    padding: 0;
    vertical-align: baseline;

    h3 {
      color: #707070;
      font-size: 18px;
      line-height: 29px;
      margin: 0 0 28px;
    }
  }

  .card-grid {

    /* border: 0;
    display: flex;
    flex-flow: row wrap;
    font: inherit;
    font-size: 1em;
    margin: 0 auto;
    max-width: 700px; */
    overflow-x: scroll;
    padding: 0;
    scroll-snap-type: x mandatory;

    img {
      object-fit: cover;
    }

    /* .invisible {
      visibility: hidden;
    } */
  }
`;

export const CarouselCardContainer = styled.div`align-content: normal;
  align-items: center;
  bottom: 100px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  margin-bottom: 80px;
  max-width: 1500px;

  a {
    color: black;
    text-decoration: none;
  }


`;

// images are in an array, img path, title, subtitle

export default CarouselWrapper;
