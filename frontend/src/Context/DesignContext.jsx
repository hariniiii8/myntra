import React,{createContext, useEffect, useState} from "react";


export const DesignContext=createContext(null);


const DesignContextProvider=(props)=>{
    
const [all_designs,setAllDesigns]=useState([])
;
useEffect(()=>{
    fetch("http://localhost:4000/getdesign")
    .then((res)=>res.json())
    .then((data)=>{
        setAllDesigns(data);
    })
    .catch((err)=>{
        console.log(err);
    })
},[]);



    const contextValue={all_designs,setAllDesigns};

return(
    <DesignContext.Provider value={contextValue}>
    {props.children}
    </DesignContext.Provider>
)
}
export default DesignContextProvider;
 