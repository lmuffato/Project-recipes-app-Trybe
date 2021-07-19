import styled from 'styled-components';

const Container = styled.section`align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: flex-end;
  margin: 0 auto;
  margin-top: 30px;
  max-width: 450px;

  section {
    gap: 0.5rem;
    margin: 0 auto;
  }

  .explore-btn, .surprise-btn {
    align-items: center;
    background: #289ea8;
    border: 0;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    font-family: Poppins , sans-serif;
    font-weight: 500;
    height: 2.5rem;
    justify-content: center;
    margin-top: auto;
    max-width: 300px;
    min-width: 120px;
    padding: 0 32px;
    text-transform: lowercase;

    a {
      color: white;
      text-decoration: none;
    }
  }

  .surprise-btn {
    background: #c10644;
  }

`;

export default Container;
