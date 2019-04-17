import React from 'react';
import ReactDOM from 'react-dom';

import Nav from './components/Nav/Nav';
import Main from './components/Main/Main';
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
      <Nav />
      <Main />
    </UIProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
