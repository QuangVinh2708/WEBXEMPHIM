import React, { createContext, useMemo, useState, useCallback } from "react";

export const SidebarContext = createContext();

function DrawerContext({ children }) {
    const [mobileDrawer, setMobileDrawer] = useState(false);
    
    const toggleDrawer = useCallback(() => {
        setMobileDrawer((prev) => !prev);
    }, []);
    
    const value = useMemo(() => ({ mobileDrawer, toggleDrawer }), [mobileDrawer, toggleDrawer]);
    
    return (
        <SidebarContext.Provider value={value}>
            {children}
        </SidebarContext.Provider>
    );
}

export default DrawerContext;
