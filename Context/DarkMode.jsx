import Cookies from 'js-cookie';
import React, { createContext, useEffect, useState } from 'react';
export const ModeContext = createContext();

export const DarkMode = ({ children }) => {
  const [Mode, setMode] = useState(
    false //Cookies?.get('Mode') === 'ON' ? true : false
  );

  return (
    <ModeContext.Provider value={{ Mode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
};
