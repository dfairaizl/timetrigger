import React from "react";
import PropTypes from "prop-types";
import { hot } from "react-hot-loader";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";

import reducer from "./state";

import { MuiThemeProvider } from "@material-ui/core/styles";

import theme from "./theme";

import Account from "./templates/Account";
import Docs from "./templates/Docs";
import Legal from "./templates/Legal";
import Homepage from "./templates/Homepage";
import Triggers from "./templates/Triggers";
import Targets from "./templates/Targets";
import SignIn from "./templates/SignIn";
import SignUp from "./templates/SignUp";

import { observeAuthStatus } from "./state/subscriptions";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

const TriggersRedirect = () => <Redirect exact to="/" />;

const AppRouter = () => {
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

const StandardRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/legal/:slug" component={Legal} />
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

MainRouter.propTypes = {
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
  }),
};

const Loading = () => {
  return <div>Loading...</div>;
};

const Container = ({ auth }) => {
  return auth.hasAuthStatus ? <MainRouter auth={auth} /> : <Loading />;
};

Container.propTypes = {
  auth: PropTypes.shape({
    hasAuthStatus: PropTypes.bool,
  }),
};

const ConnectedContainer = connect((state) => {
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
