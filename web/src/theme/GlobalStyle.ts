import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@400;600;700;800&display=swap');

  * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }

  body {
    margin: 0;
    font-family: 'Manrope', 'Inter', system-ui, -apple-system, sans-serif;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.5;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }

  .has-event {
    background: ${({ theme }) => theme.colors.success} !important;
    color: #fff;
    border-radius: 4px;
  }

  .event-dot {
    display: block;
    width: 6px;
    height: 6px;
    margin: 2px auto;
    background: ${({ theme }) => theme.colors.info};
    border-radius: 50%;
  }

  button, input, textarea, select {
    font-family: inherit;
  }
`;
