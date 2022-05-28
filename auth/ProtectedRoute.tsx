import React, { useContext, useEffect } from "react"
import { useRouter } from "next/router"
import { AuthContext } from "./AuthContext"
import LoadingScreen from "../lib/LoadingScreen"

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useContext(AuthContext)
    const Router = useRouter()

    if (currentUser) {
        useEffect(() => {
            Router.push("/dashboard")
        })

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