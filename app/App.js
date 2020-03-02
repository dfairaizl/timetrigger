import React from "react";
import { hot } from "react-hot-loader";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";

import reducer from "./state";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import Account from "./screens/Account";
import Docs from "./screens/Docs";
import Triggers from "./screens/Triggers";
import Targets from "./screens/Targets";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";

import { observeAuthStatus } from "./state/subscriptions";

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
      paper: "#FDFDFD",
      default: "#FDFDFD"
    },
    primary: {
      light: "#ff4774",
      main: "#FF1952",
      dark: "#b21139",
      contrastText: "#FDFDFD"
    },
    secondary: {
      dark: "#201C37",
      main: "#2E294F",
      light: "#575372"
    },
    text: {
      primary: "#2E2E2E",
      secondary: "#454545"
    }
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: "#FDFDFD",
        color: "#2E2E2E"
      }
    }
  }
});

const TriggersRedirect = props => <Redirect exact to="/" />;

const AppRouter = props => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Triggers} />
        <Route exact path="/account" component={Account} />
        <Route exact path="/docs" component={Docs} />
        <Route exact path="/targets" component={Targets} />
        <Route component={TriggersRedirect} />
      </Switch>
    </Router>
  );
};

const StandardRouter = props => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route component={SignIn} />
      </Switch>
    </Router>
  );
};

const MainRouter = ({ auth }) => {
  return auth.isAuthenticated ? <AppRouter /> : <StandardRouter />;
};

const Loading = props => {
  return <div>Loading...</div>;
};

const Container = ({ auth }) => {
  return auth.hasAuthStatus ? <MainRouter auth={auth} /> : <Loading />;
};

const ConnectedContainer = connect(state => {
  return { auth: state.auth };
})(Container);

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <ConnectedContainer />
      </Provider>
    </MuiThemeProvider>
  );
};

store.dispatch(observeAuthStatus());

export default hot(module)(App);
