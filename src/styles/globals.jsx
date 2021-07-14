import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: var(--background-first-color);
  }

  button {
    outline: none;

    &:active {
      outline: none;
    }

    &:hover {
      outline: none;
    }
  }

  :root {
    --global-space: 2rem 1.8rem;
    --red-first-color: #ff2637;
    --red-second-color: rgb(252, 76, 74);
    --background-first-color: #ffeee1;
    --text-first-color: #2f2f2f;
    --font-first: 'Lobster', cursive;
    --font-second: 'Poppins', sans-serif;
    --font-third: 'Quicksand', sans-serif;
  }
`;
