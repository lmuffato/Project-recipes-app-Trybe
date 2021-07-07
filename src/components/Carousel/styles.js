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
    border: 0;
    display: flex;
    flex-wrap: wrap;
    font: inherit;
    font-size: 1em;
    margin: 0 auto;
    max-width: 700px;
    padding: 0;

    /* scroll-behavior: smooth; */

    /* vertical-align: baseline; */
    .carousel-card-tracker {
      border: 0;
      font: inherit;
      font-size: 1em;
      margin: 0 auto;
      margin-bottom: 28px;
      min-width: auto;
      padding: 0;
      vertical-align: baseline;
    }

    img {
      object-fit: cover;

    }

    .invisible {
      visibility: hidden;
    }
  }
`;

export const CarouselCardContainer = styled.div`border-radius: 4px;

  a {
    cursor: pointer;
    display: flex;
    flex-wrap: wrap;
    max-width: 728px;
    scroll-behavior: smooth;
    text-decoration: none;

    div {
      display: flex;
      flex-wrap: wrap;
      height: 0;
      margin: auto 2px auto 4px;
      min-height: 176px;
      min-width: auto;
      outline: 0;
      overflow: hidden;

      /* padding-bottom: 100%; */
      position: relative;
      width: 136px;
      z-index: 2;
    }

    .img-wrapper {
      height: 100%;
      min-width: 100%;
      object-fit: cover;
      width: auto;

      img {
        aspect-ratio: auto 343 / 343;
        border-radius: 4px;
        bottom: auto;
        height: 100%;
        left: auto;
        min-width: 100%;
        object-fit: cover;
        position: relative;
        right: 50%;
        top: 0;
        transform: translateX(50%);
        width: auto;
      }
    }

    .recipe-info {
      display: flex;
      flex-direction: row;
      margin: 12px auto 6px;
      z-index: 2;
    }

  }


`;

// images are in an array, img path, title, subtitle

export default CarouselWrapper;
