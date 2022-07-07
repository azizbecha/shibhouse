import { Auth, getAuth, signOut } from "firebase/auth";

const logOut = async (): Promise<void> => {
    const auth: Auth = getAuth();
    return await signOut(auth);
}

export { logOut }