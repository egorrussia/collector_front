import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "../../config";

const AuthContext = createContext();

const defaultUser = {loading:true}

const setIntoStorage = (user) =>{
    localStorage.setItem("binance-user",JSON.stringify(user))
}

const getFromStorage = () =>{
    if(!window) return defaultUser
    const userstr = localStorage.getItem("binance-user")
    if(userstr){
        return JSON.parse(userstr)
    }
    return {loading:false}
}

const deleteFromStorage = () =>{
    localStorage.clear("binance-user")
}

export const AuthProvider= ({children})=>{

    const [user, setUser] = useState(defaultUser);

    console.log({user})

    const login = ({login,password}) => {
        fetch(`${API_URL}/login`,{
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                login,password
            }),
            method: "POST"

        }).then(res=>res.json())
        .then(data=>{
            if(data.token){
                setUser({
                    ...data,
                    loading: false
                })
                setIntoStorage({
                    ...data,
                    loading: false
                })

            }

        })


    }

    const setUserSettings = (settings) => {

        setIntoStorage({
            ...user,
            settings
        })

        setUser({
            ...user,
            settings
        })
    }

    const router = useRouter();
    const logout = () =>{
        setUser({})
        router.push("/signin")
        deleteFromStorage()

    }

    useEffect(()=>{
        setUser(getFromStorage())
    },[]);

    const value = {user,login,logout,setUserSettings}

    return(
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )



}

export const useAuthContext = ()=> useContext(AuthContext)
