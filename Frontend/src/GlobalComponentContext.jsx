import React, { createContext, useState, useContext } from 'react';

const GlobalComponentContext = createContext();

export const GlobalComponentProvider = ({ children }) => {
  const [isComponentVisible, setComponentVisible] = useState(false);

  const toggleComponentVisibility = () => {
    setComponentVisible(!isComponentVisible);
  };

  return (
    <GlobalComponentContext.Provider value={{ isComponentVisible, toggleComponentVisibility }}>
      {children}
    </GlobalComponentContext.Provider>
  );
};

export const useGlobalComponent = () => {
  return useContext(GlobalComponentContext);
};
