import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { provideBundle } from '../utils/react-context';
import { colors } from './theme';
import Home from '../home/Home';
import Dashboard from '../dashboard/Dashboard';
import UserProvider from './UserProvider';

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 62.5%;
  }

  body {
    font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
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

function App() {
  return (
    <Fragment>
      <GlobalStyle></GlobalStyle>
      <Providers>
        <Routes />
      </Providers>
    </Fragment>
  );
}

const Providers = provideBundle(UserProvider);

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;
