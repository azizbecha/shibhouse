import { getAuth, signOut } from "firebase/auth";

const logOut = async (): Promise<void> => {
    const auth = getAuth();
    return await signOut(auth)
}

export { logOut }