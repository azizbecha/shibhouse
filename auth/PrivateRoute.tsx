import React, { useContext, useEffect } from "react"
import { useRouter } from "next/router"
import { AuthContext } from "./AuthContext"
import LoadingScreen from "../lib/LoadingScreen"

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
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            Router.push("/login")
        }, [])

        return <LoadingScreen />
    }
}

export default PrivateRoute