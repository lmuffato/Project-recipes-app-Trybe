import styled from 'styled-components';

const CardGridContainer = styled.div`align-content: normal;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  max-width: 1180px;
  position: relative;
  transition: opacity 400ms ease;
  z-index: 0;
`;

export default CardGridContainer;

export const PageGrid = styled.div`align-self: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: space-evenly;
  margin: 18px auto;
  max-width: 600px;
  padding: 0 12px;

  button {
    align-items: center;
    background: #289ea8;
    border: 0;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    display: flex;
    font-family: Poppins , sans-serif;
    font-weight: 500;
    height: 2.5rem;
    justify-content: center;
    margin-top: auto;
    max-width: 180px;
    min-width: 120px;
    padding: 0 22px;
    text-transform: lowercase;

    & + button {
      margin-top: 0.5rem;
    }
  }

  @media only screen and ( max-width : 560px ) {
    max-width: 500px;
  }

  @media only screen and ( min-width : 600px ) {
    gap: 0.3rem;
    margin-top: 10px;
    min-width: 300px;
    padding: 0;
  }
`;
