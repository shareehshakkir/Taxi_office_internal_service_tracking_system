import { createContext, useContext } from "react";
import { useBoolean } from "@chakra-ui/react";
import { useState } from "react";

export const NavbarContext = createContext(null);

export const NavbarProvider = ({ children }) => {
  const [toggle, setToggle] = useState(false);

  const toggleFn = () => {
    setToggle(!toggle);
  };

  return (
    <NavbarContext.Provider value={{ toggle, toggleFn }}>
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavContext = () => {
  return useContext(NavbarContext);
};
