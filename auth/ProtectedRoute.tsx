import React, { useContext, useEffect } from "react"
import { useRouter } from "next/router"
import { AuthContext } from "./AuthContext"
import LoadingScreen from "../lib/LoadingScreen"
import { toast } from "react-toastify"

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useContext(AuthContext)
    const Router = useRouter()

    if (currentUser) {
        useEffect(() => {
            Router.push("/dashboard")
        })
        toast.warning('You are already logged in', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        return (
            <LoadingScreen />
        )
    } else {
        return (
            <>
                {children}
            </>
        )
    }
}

export default ProtectedRoute