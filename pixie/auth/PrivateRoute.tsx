import React, { Fragment, useContext, useEffect } from "react"
import { NextRouter, useRouter } from "next/router"

import { AuthContext } from "./AuthContext"
import LoadingScreen from "../components/LoadingScreen"

const PrivateRoute: React.FC = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    const router: NextRouter = useRouter();

    if (currentUser) {
        return (
            <Fragment>
                {children}
            </Fragment>
        )
    } else {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            router.push("/login");
        }, [router])

        return <LoadingScreen />
    }
}

export default PrivateRoute