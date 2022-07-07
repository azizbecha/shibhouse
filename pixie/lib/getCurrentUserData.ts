import { Auth, getAuth, User } from "firebase/auth";

const getCurrentUserData = () => {

    const auth: Auth = getAuth();
    const user: User = auth.currentUser;
    return user
}

export default getCurrentUserData