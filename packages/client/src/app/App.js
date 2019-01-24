import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { provideBundle } from '../utils/react-context';
import ScrollToTop from '../common/ScrollToTop';
import { colors } from './theme';
import Home from '../home/Home';
import Dashboard from '../dashboard/Dashboard';
import Privacy from '../legal/privacy';
import Terms from '../legal/terms';
import UserProvider from './UserProvider';

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 62.5%;
  }

  body {
    font-size: 1.6rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${colors.textDefault};
    background-color: ${colors.background};
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: "Lato", sans-serif;
    font-weight: 400;
    color: ${colors.textHeader};
  }

  b, strong {
    font-weight: 600;
  }

  button, a {
    cursor: pointer;
  }

  a {
    color: ${colors.textLink};
    text-decoration: none;
  }

  dt {
    color: ${colors.unimportant};
    text-transform: uppercase;
    font-size: 14px;
    vertical-align: top;
  }

  p {
    margin-top: 0;
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
      <Fragment>
        <ScrollToTop />
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/terms" component={Terms} />
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
