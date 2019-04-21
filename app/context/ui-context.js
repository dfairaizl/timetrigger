import React, { createContext, useContext, useReducer } from 'react';

export const UIContext = createContext();

export const UIProvider = ({reducer, initialState, children}) => (
  <UIContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </UIContext.Provider>
);

export const useUIContext = () => useContext(UIContext);
