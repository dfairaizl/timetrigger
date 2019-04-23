import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Nav from './components/Nav/Nav';
import Main from './components/Main/Main';
import SignUp from './components/SignUp/SignUp';
import { AuthProvider, useAuthContext } from './context/auth-context';
import { UIProvider } from './context/ui-context';

import './index.scss';

const MainApp = (props) => {
  const initialState = { triggerDialogOpen: false };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'ToggleDialog':
        return {
          ...state,
          triggerDialogOpen: action.toggle
        };

      default:
        return state;
    }
  };

  return (
    <UIProvider initialState={initialState} reducer={reducer}>
      <Nav />
      <Main />
    </UIProvider>
  );
};

const SignUpRoute = () => {
  return <SignUp />;
};

function MainRoute ({ component: Component, ...rest }) {
  const { isAuthenticated } = useAuthContext();
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
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

const App = () => {
  // const reducer = (state, action) => {
  //   const newState = { ...state };
  //
  //   switch (action.type) {
  //     case 'LOGIN':
  //       newState.user = action.user;
  //       return newState;
  //     default:
  //       return newState;
  //   }
  // };

  return (
    <AuthProvider>
      <Router>
        <MainRoute exact path='/' component={MainApp} />
        <Route path='/sign-up' component={SignUpRoute} />
      </Router>
    </AuthProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
