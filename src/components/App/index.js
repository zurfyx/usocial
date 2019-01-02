import React, { Fragment } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }
`;

const AppContainer = styled.div`

`;

function App() {
  const API = process.env.REACT_APP_API || 'http://localhost:3001';
  console.info(API)
  fetch(API + '/').then((v) => {
    console.info(v);
  })
  return (
    <Fragment>
      <GlobalStyle></GlobalStyle>
      <AppContainer>
        <h1>It works!</h1>
      </AppContainer>
    </Fragment>
  );
}

export default App;
