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

import theme from "./theme";

import Account from "./screens/Account";
import Docs from "./screens/Docs";
import Homepage from "./screens/Homepage";
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
        <Route exact path="/" component={Homepage} />
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
