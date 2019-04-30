import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { AuthProvider, useAuthContext } from './context/auth-context';
import App from './components/App/App';
import Main from './components/Main/Main';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Targets from './components/Targets/Targets';

import './index.scss';

function NonAuthenticatedRoute ({ component: Component, ...rest }) {
  const { isAuthenticated } = useAuthContext();
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? (
          <Component {...props} />
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

function AuthenticatedRoute ({ component: Component, ...rest }) {
  const { isAuthenticated } = useAuthContext();
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
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

const Root = () => {
  return (
    <AuthProvider>
      <Router>
        <AuthenticatedRoute exact path='/' component={Main} />
        <AuthenticatedRoute exact path='/targets' component={Targets} />
        <NonAuthenticatedRoute path='/sign-up' component={SignUp} />
        <NonAuthenticatedRoute path='/sign-in' component={SignIn} />
      </Router>
    </AuthProvider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
