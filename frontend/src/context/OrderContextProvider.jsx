import React, { useState } from "react";

import orderContext from "./orderContext";
 


const OrderContextProvider = ({children})=>{
    const [checkoutItems, setCheckoutItems] = useState([]);
    const [orders, setorders] = useState([])

    return(
        <orderContext.Provider value={{orders, setorders,checkoutItems,setCheckoutItems}}>
            {children}
        </orderContext.Provider>
    )

}

export default OrderContextProvider