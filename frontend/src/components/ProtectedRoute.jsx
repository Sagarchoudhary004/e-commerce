import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";




function ProtectedRoute({ children }) {
    const [isLogin, setisLogin] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await axios.get(
                    "http://localhost:8000/api/v1/user/profile",
                    {
                        withCredentials: true
                    }
                )
                setisLogin(true);
               // return children
            } catch (error) {
                setisLogin(false);
                
                console.log(error);
                
                
            }
           
           // return <Navigate to="/" />
        }
         
        checkAuth();
    }, [])
    if (isLogin===null) {
       return <div>Loading...</div>;
        
    }
     else if (isLogin===true) {
                return children
            } else if(isLogin=== false) {
                 return <Navigate to="/" />
            }



}


export default ProtectedRoute
