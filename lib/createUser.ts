import { NewUser } from "../interfaces"

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from "firebase/firestore"; 

import randomColor from "randomColor";

import { auth, fireStore } from '../auth/Firebase'
import getCurrentUserData from "./getCurrentUserData";
import { capitalizeWord } from "./capitalize";

const createUser = (user: NewUser) => {
    createUserWithEmailAndPassword(auth, user.email, user.password)
    .then(async () => {
        const userData = getCurrentUserData()
        const docRef = await setDoc(doc(fireStore, "users", userData.uid), {
            id: userData.uid,
            firstname: capitalizeWord(user.firstname).trim(),
            lastname: capitalizeWord(user.lastname).trim(),
            email: user.email,
            username: user.username,
            followers: [],
            following: [],
            claps: 0,
            joinDate: new Date(),
            avatarColor: randomColor({luminosity: 'dark'})
        });
        
    })
    return true
    
}

export { createUser }