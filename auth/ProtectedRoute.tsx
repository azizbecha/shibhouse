import React, { Fragment, useContext, useEffect } from "react"
import { useRouter } from "next/router"
import { AuthContext } from "./AuthContext"
import LoadingScreen from "../components/LoadingScreen"

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {
        if (currentUser) {
            router.push("/dashboard");
        }
    }, [currentUser, router])

    if (currentUser) {
        return (
            <LoadingScreen />
        )
    } else {
        return (
            <Fragment>
                {children}
            </Fragment>
        )
    }
}

export default ProtectedRoute