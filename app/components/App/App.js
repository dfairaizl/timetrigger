import React from 'react';
import { UIProvider } from '../../context/ui-context';
import Nav from '../Nav/Nav';
import Main from '../Main/Main';

export default (props) => {
  const initialState = { triggerDialogOpen: false, keysDialogOpen: false };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'ToggleTriggerDialog':
        return {
          ...state,
          triggerDialogOpen: action.toggle
        };
      case 'ToggleKeysDialog':
        return {
          ...state,
          keysDialogOpen: action.toggle
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
