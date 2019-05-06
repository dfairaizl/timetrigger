import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducer from './state';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import App from './App';
import Main from './containers/Main';
import Targets from './containers/Targets';
// import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';

import {
  observeAuthStatus
} from './state/subscriptions';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: '#EF476F'
    },
    secondary: {
      main: '#2D2D2D'
    }
  }
});

function NonAuthenticatedRoute ({ component: Component, auth, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        !auth.isAuthenticated ? (
          <App><Component {...props} /></App>
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

const ConnectedNonAuthenticatedRoute = connect((state) => {
  return { auth: state.auth };
})(NonAuthenticatedRoute);

function AuthenticatedRoute ({ component: Component, auth, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        auth.isAuthenticated ? (
          <App><Component {...props} /></App>
        ) : (
          <Redirect
            to={{
              pathname: '/sign-up',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

const ConnectedAuthenticatedRoute = connect((state) => {
  return { auth: state.auth };
})(AuthenticatedRoute);

const Root = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <ConnectedAuthenticatedRoute exact path='/' component={Main} />
          <ConnectedAuthenticatedRoute path='/targets' component={Targets} />
          <ConnectedNonAuthenticatedRoute path='/sign-up' component={SignUp} />
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
};

store.dispatch(observeAuthStatus());

ReactDOM.render(<Root />, document.getElementById('root'));
