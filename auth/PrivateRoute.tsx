import React, { useContext, useEffect } from "react"
import { useRouter } from "next/router"
import { AuthContext } from "./AuthContext"
import LoadingScreen from "../lib/LoadingScreen"
import { toast } from "react-toastify"

const PrivateRoute = ({ children }) => {
    const { currentUser } = useContext(AuthContext)
    const Router = useRouter()

    if (currentUser) {
        return (
            <>
                {children}
            </>
        )
    } else {
        useEffect(() => {
            Router.push("/login")
        })
        toast.warning('You need to log in first', {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        return <LoadingScreen />
    }
}

export default PrivateRoute