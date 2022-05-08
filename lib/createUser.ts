import { NewUser } from "../interfaces"
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, fireStore } from '../auth/Firebase'
import { collection, addDoc } from "firebase/firestore"; 

const createUser = (user: NewUser) => {
    createUserWithEmailAndPassword(auth, user.email, user.password)
    .then(async () => {
        const docRef = await addDoc(collection(fireStore, "users"), {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            username: user.username
        });
    })
    
    return true
}

export { createUser }