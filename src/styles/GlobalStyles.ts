import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  html, body, #root {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;

    background-color: #292c2d;
    color: #ffffff;

    font-family: San Francisco, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    * {
      box-sizing: border-box;
    }
  }

  @font-face {
    font-family: San Francisco;
    font-weight: 300;
    src: url("/sfns-ttf/SFNSDisplay-Light.ttf") format("truetype");
  }
  @font-face {
    font-family: San Francisco;
    font-weight: 400;
    src: url("/sfns-ttf/SFNSDisplay-Regular.ttf") format("truetype");
  }
  @font-face {
    font-family: San Francisco;
    font-weight: 500;
    src: url("/sfns-ttf/SFNSDisplay-Medium.ttf") format("truetype");
  }
  @font-face {
    font-family: San Francisco;
    font-weight: 600;
    src: url("/sfns-ttf/SFNSDisplay-Semibold.ttf") format("truetype");
  }
  @font-face {
    font-family: San Francisco;
    font-weight: 700;
    src: url("/sfns-ttf/SFNSDisplay-Bold.ttf") format("truetype");
  }
  @font-face {
    font-family: San Francisco;
    font-weight: 800;
    src: url("/sfns-ttf/SFNSDisplay-Heavy.ttf") format("truetype");
  }
`;
