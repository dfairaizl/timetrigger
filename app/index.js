import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducer from './state';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// import App from './App';
import Main from './containers/Main';
import Targets from './containers/Targets';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';

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

const MainRedirect = (props) => <Redirect exact to='/' />;

const AppRouter = (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Main} />
        <Route exact path='/targets' component={Targets} />
        <Route component={MainRedirect} />
      </Switch>
    </Router>
  );
};

const StandardRouter = (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={SignIn} />
        <Route exact path='/sign-in' component={SignIn} />
        <Route exact path='/sign-up' component={SignUp} />
      </Switch>
    </Router>
  );
};

const MainRouter = ({ auth }) => {
  return auth.isAuthenticated ? <AppRouter /> : <StandardRouter />;
};

const Loading = (props) => {
  return (
    <div>Loading...</div>
  );
};

const Container = ({ auth }) => {
  return auth.hasAuthStatus ? <MainRouter auth={auth} /> : <Loading />;
};

const ConnectedContainer = connect((state) => {
  return { auth: state.auth };
})(Container);

const Root = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <ConnectedContainer />
      </Provider>
    </MuiThemeProvider>
  );
};

store.dispatch(observeAuthStatus());

ReactDOM.render(<Root />, document.getElementById('root'));
