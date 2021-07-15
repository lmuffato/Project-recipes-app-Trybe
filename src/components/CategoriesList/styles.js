import styled from 'styled-components';

const CategoriesListContainer = styled.div`align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: space-evenly;
  margin: 0 auto;
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
    max-width: 300px;
    min-width: 125px;
    padding: 0 32px;
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
    margin-top: 20px;
    max-width: 1000px;
    min-width: 300px;
    padding: 0;
  }
`;

export default CategoriesListContainer;
