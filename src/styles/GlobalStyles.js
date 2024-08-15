import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

  body {
    margin: 0;
    padding: 0;
    font-family: 'Press Start 2P', cursive;
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyles;