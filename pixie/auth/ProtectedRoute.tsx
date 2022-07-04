import React, { Fragment, useContext, useEffect } from "react"
import { NextRouter, useRouter } from "next/router"
import { AuthContext } from "./AuthContext"
import LoadingScreen from "../components/LoadingScreen"

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    const router: NextRouter = useRouter();

    useEffect(() => {
        if (currentUser) {
            router.push("/dashboard");
        }
    }, [currentUser, router])


    return currentUser ? <LoadingScreen /> :  <Fragment>{children}</Fragment>
}

export default ProtectedRoute