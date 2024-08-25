import React, { createContext, useState, useContext } from 'react';

const GlobalComponentContext = createContext();

export const GlobalComponentProvider = ({ children }) => {
  const [isComponentVisible, setComponentVisible] = useState(false);

  const toggleComponentVisibility = () => {
    setComponentVisible(!isComponentVisible);
  };

  const componentVisibleFalse=()=>{
    setComponentVisible(false);
  }

  return (
    <GlobalComponentContext.Provider value={{ isComponentVisible, toggleComponentVisibility, componentVisibleFalse }}>
      {children}
    </GlobalComponentContext.Provider>
  );
};

export const useGlobalComponent = () => {
  return useContext(GlobalComponentContext);
};
