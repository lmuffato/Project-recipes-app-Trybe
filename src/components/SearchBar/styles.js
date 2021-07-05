import styled from 'styled-components';

const SearchBarContainer = styled.form`align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 20px auto;
  overflow: hidden;

  > input {
    background: lightgrey;
    border: 0;
    border-radius: 8px;
    height: 50px;
    margin-bottom: 20px;
    max-width: 350px;
    padding: 0 32px;
    text-align: center;
    width: 90%;

    > :-webkit-input-placeholder {
      text-align: center;
    }
  }

  .form-control {
    align-items: center;
    display: flex;
    justify-content: space-around;
    margin: 0 auto;
    max-width: 700px;

    label {
      align-items: center;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 30px;
      margin-right: 20px;
      margin-top: 20px;
      padding: 0 1em 0 8px;
      text-align: center;

      & + label {
        align-self: center;
      }

      > input {
        border: 2px solid lightgrey;
        display: flex;
        gap: 5px;
        justify-self: space-evenly;
        margin: 4px 7px 0 6px;
        margin-left: 10px;
        padding: 0 10px;
        text-align: left;
      }

    }

  }

  .btn-container {
    display: flex;
    gap: 1rem;
  }

  button {
    align-items: center;
    border: 0;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    font-weight: 600;
    gap: 20px;
    height: 40px;
    justify-content: center;
    margin-top: auto;
    max-width: 200px;
    min-width: 180px;
    padding: 0 32px;
  }

  @media ( max-width : 600px ) {

    form {
      font-size: 87.5%;
    }

    > input {
      max-width: 260px;
    }

    .form-control {
      align-items: center;
      font-size: 0.95rem;
      padding-bottom: 1.5rem;

      label {
        margin: 0.45rem;
        padding: 0;

        & + label {
          margin: 0.45rem;
          margin-left: 15px;
          padding: 0;
        }

        > input {
          align-self: flex-start;
          margin-left: -10px;
          text-align: center;
          vertical-align: middle;
        }
      }
    }
  }
`;

export default SearchBarContainer;

// Source - how to align a placeholder:
// https://www.w3docs.com/snippets/css/how-to-align-placeholder-text-of-input-field-in-html.html
