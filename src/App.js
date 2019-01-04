import React, { Fragment } from 'react';
import { createGlobalStyle } from 'styled-components';
import { colors } from './theme';
// import Home from './home';
import Dashboard from './dashboard';

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

  @media(max-width: 900px) {
    body {
      font-size: 1.8em;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: "Lato", sans-serif;
    font-weight: 400;
  }

  b, strong {
    font-weight: 600;
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
      <Dashboard />
    </Fragment>
  );
}

export default App;
