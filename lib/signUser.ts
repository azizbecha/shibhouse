import { LogUser } from "../interfaces"
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../auth/Firebase'

const signUser = async (user: LogUser) => {
    
    return signInWithEmailAndPassword(auth, user.email, user.password)
    
}

export { signUser }