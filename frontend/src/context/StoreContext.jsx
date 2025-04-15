import { createContext, useEffect, useState } from "react";
import { blogData } from "../assets/assets";

export const StoreContext=createContext(null);

const StoreContextProvider=({children})=>{
    const [user,setUser]=useState(null);

    useEffect(()=>{
        const storedUser=localStorage.getItem("user");
        if(storedUser){
            setUser(storedUser);
        }
    },[])

    const loginUser=(user,token)=>{
        setUser(user);
        localStorage.setItem("user",JSON.stringify(user));
        localStorage.setItem("token",token);
    }

    const logoutUser=()=>{
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }
    const contextValue={blogData,user,loginUser,logoutUser};

    return(
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;