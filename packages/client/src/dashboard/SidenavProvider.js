import React, { createContext, useState } from 'react'

const SidenavContext = createContext();

function SidenavProvider({ children }) {
  const [isMobileVisible, setIsMobileVisible] = useState(false);

  return (
    <SidenavContext.Provider value={{ isMobileVisible, setIsMobileVisible }}>
      { children }
    </SidenavContext.Provider>
  );
}

export {
  SidenavContext,
}
export default SidenavProvider;
