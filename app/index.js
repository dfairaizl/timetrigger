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

// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app';

// Add the Firebase products that you want to use
import 'firebase/auth';
import 'firebase/firestore';

import {
  observeAuthStatus
} from './state/subscriptions';

firebase.initializeApp({
  apiKey: 'AIzaSyBvdk2NRKDO5ieQbBKuFzdDczDKZU92tm8',
  authDomain: 'timetrigger-5a192.firebaseapp.com',
  databaseURL: 'https://timetrigger-5a192.firebaseio.com',
  projectId: 'timetrigger-5a192',
  storageBucket: 'timetrigger-5a192.appspot.com',
  messagingSenderId: '987939680502'
});

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
    background: {
      paper: '#FDFDFD',
      default: '#FDFDFD'
    },
    primary: {
      light: '#ff4774',
      main: '#FF1952',
      dark: '#b21139',
      contrastText: '#FDFDFD'
    },
    secondary: {
      dark: '#201C37',
      main: '#2E294F',
      light: '#575372'
    },
    text: {
      primary: '#2E2E2E',
      secondary: '#454545'
    }
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: '#FDFDFD',
        color: '#2E2E2E'
      }
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
