import Router from "next/router"
import { useEffect } from "react"
import { useAuthContext } from "@components/context/Auth"

const AuthWrapper = ({Component}) =>{

    const {user} = useAuthContext()

    const {token} = user

    useEffect(()=>{
        if(!token){
            Router.push("/signin")
        }


    },[loading,token])

    if(loading){
        return (
            <div className="spinner-wrapper">
                <div className="spinner-border" role="status"></div>
            </div>
        )
    }

    if(token){
        return <Component/>
    }else{
        return (
            <div className="spinner-wrapper">
                <div className="spinner-border" role="status"></div>
            </div>
        )
    }
    
}

export const withAuthWrapper = (Component)=>{
    return ()=><AuthWrapper Component={Component}/>
}