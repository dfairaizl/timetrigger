import React from 'react';
import { UIProvider } from '../../context/ui-context';
import Nav from '../Nav/Nav';
import Main from '../Main/Main';

export default (props) => {
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
