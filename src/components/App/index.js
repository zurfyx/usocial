import React, { Fragment } from 'react';
import { createGlobalStyle } from 'styled-components';
import { colors } from '../../utils/css';
import Home from '../Home';

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 62.5%;
  }

  body {
    font-family: "Open Sans", sans-serif;
    font-size: 2em;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${colors.textDefault};
  }

  @media (max-width: 400px) {
    body {
      font-size: 1.6em;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: "Lato", sans-serif;
    font-weight: 400;
  }

  button, a {
    cursor: pointer;
  }

  a {
    color: ${colors.textDefault};
    text-decoration: none;
  }
`;

// const AppContainer = styled.div`
// `;

function App() {
  return (
    <Fragment>
      <GlobalStyle></GlobalStyle>
      <Home />
    </Fragment>
  );
}

export default App;
