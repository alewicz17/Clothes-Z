import React, {createContext, useContext, useState} from 'react';

const StateContext = createContext();

export const ContextProvider = ({children}) =>{
    const [loggedIn, setLoggedIn] = useState(false);
    const [SellModalOpen, setSellModalOpen] = useState(false)   
    const [popupOpen, setpopupOpen] = useState(false)
    
    return(  
        <StateContext.Provider value={{loggedIn, setLoggedIn, SellModalOpen, setSellModalOpen, popupOpen, setpopupOpen }}>
            {children}

        </StateContext.Provider>
    )   
    }
export const useStateContext = () => useContext(StateContext)