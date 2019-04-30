import React from 'react';
import { UIProvider } from '../../context/ui-context';
import Nav from '../Nav/Nav';

export default (props) => {
  const initialState = {
    keysDialogOpen: false,
    targetDialogOpen: false,
    triggerDialogOpen: false
  };

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
      case 'ToggleTargetDialog':
        return {
          ...state,
          targetDialogOpen: action.toggle
        };

      default:
        return state;
    }
  };

  return (
    <UIProvider initialState={initialState} reducer={reducer}>
      <Nav />
      {props.children}
    </UIProvider>
  );
};
