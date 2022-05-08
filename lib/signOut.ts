import { getAuth, signOut } from "firebase/auth";

const logOut = async () => {
    const auth = getAuth();
    return await signOut(auth)
}

export { logOut }