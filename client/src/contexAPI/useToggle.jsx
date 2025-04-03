import { createContext, useContext, useState } from "react";

export const ToggleContext = createContext(null);

export const useToggleContext = () => {
    return useContext(ToggleContext)
}

export const ToggleProvider = ({children}) => {
     const [isDrawerOpen, setIsDrawerOpen] = useState(false);

     const toggleDrawer = () => {
        console.log("clicked")
        setIsDrawerOpen((prev) => !prev);
      };

    return <ToggleContext.Provider value={{ isDrawerOpen, setIsDrawerOpen, toggleDrawer}}>
    {children}
  </ToggleContext.Provider>
}
