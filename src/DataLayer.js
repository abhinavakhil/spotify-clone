// here in this project we are using context api not redux
import React, { createContext, useContext, useReducer } from "react";

export const DataLayerContext = createContext();

// children refer to app component in index.js
export const DataLayer = ({ initialState, reducer, children }) => (
  <DataLayerContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </DataLayerContext.Provider>
);

export const useDataLayerValue = () => useContext(DataLayerContext);
