import { useContext } from "react"
import { AuthContext } from "../auth/AuthContext"

const getUserData = () => {
    const { currentUser } = useContext(AuthContext);
    return currentUser
}

export default getUserData