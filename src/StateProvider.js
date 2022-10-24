import { red } from "@mui/material/colors";
import React, {createContext, useContext, useReducer} from "react";

//prepare the data layer
export const StateContext = createContext();

//wrap the app and provide data layer
export const StateProvider = ({reducer, initialState, children}) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
        </StateContext.Provider>
);

//pull info from the data layer
export const useStateValue = () => useContext(StateContext);