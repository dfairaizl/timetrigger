import React from 'react';
import ReactDOM from 'react-dom';

// import Nav from './components/Nav/Nav';
// import Main from './components/Main/Main';
import SignUp from './components/SignUp/SignUp';
import { UIProvider } from './context/ui-context';

import './index.scss';

const App = () => {
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
      <SignUp />
    </UIProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
