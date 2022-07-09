import { signInWithEmailAndPassword, UserCredential } from 'firebase/auth'
import { auth } from '../auth/Firebase'
import { LogUser } from "../interfaces"

const signUser = async (user: LogUser): Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, user.email, user.password);
}

export { signUser }