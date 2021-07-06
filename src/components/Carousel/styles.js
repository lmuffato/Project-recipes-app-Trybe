import styled from 'styled-components';

const CarouselContainer = styled.div`background-color: white;
  display: flex;
  /* flex-direction: row; */
  height: 500px;
  margin-bottom: 3rem;
  max-width: 90vw;
  min-width: 640px;

  .carouselInner {
    display: flex;
    flex-direction: row;
    gap: 3.2rem;
    height: 100%;
    width: 100%;
  }
`;

// images are in an array, img path, title, subtitle

export default CarouselContainer;
