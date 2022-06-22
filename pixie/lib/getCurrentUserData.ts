import { getAuth } from "firebase/auth";

const getCurrentUserData = () => {

    const auth = getAuth();
    const user = auth.currentUser;
    return user
}

export default getCurrentUserData