import { NewUser } from "../interfaces"
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, fireStore } from '../auth/Firebase'
import { doc, setDoc } from "firebase/firestore"; 
import getCurrentUserData from "./getCurrentUserData";

const createUser = (user: NewUser) => {
    createUserWithEmailAndPassword(auth, user.email, user.password)
    .then(async () => {
        const userData = getCurrentUserData()
        const docRef = await setDoc(doc(fireStore, "users", userData.uid), {
            id: userData.uid,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            username: user.username,
            joinDate: new Date()
        });
        
    })
    
    return true
}

export { createUser }