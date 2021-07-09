import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: var(--text-first-color);
  }

  body {
    background: var(--background-first-color);
  }

  :root {
    --global-space: 2rem 1.8rem;
    --background-first-color: #ffecda;
    --text-first-color: #2f2f2f;
    --font-first: 'Lobster', cursive;
    --font-second: 'Poppins', sans-serif;
    --font-third: 'Quicksand', sans-serif;
  }
`;
