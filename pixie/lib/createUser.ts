import { NewUser } from "../interfaces"

import { createUserWithEmailAndPassword, User } from 'firebase/auth'
import { collection, doc, DocumentData, getDocs, Query, query, QuerySnapshot, setDoc, where } from "firebase/firestore"; 

import { toast } from "react-toastify";

import { auth, fireStore } from '../auth/Firebase'
import getCurrentUserData from "./getCurrentUserData";
import { capitalizeWord } from "./capitalize";
import { getRandomColor } from "./getRandomColor";

const createUser = async (user: NewUser): Promise<void> => {

    // Check if there is a user with the same username
    const q: Query<DocumentData> = query(collection(fireStore, "users"), where("username", "==", user.username));
    const queryData: QuerySnapshot<DocumentData> = await getDocs(q);
    const users = queryData.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    // If username is not used
    if (users.length == 0) {

        try {
            // Create new user
            await createUserWithEmailAndPassword(auth, user.email, user.password);

            // Get created user data
            const userData: User = getCurrentUserData();

            // Push user details to Firebase
            const docRef = await setDoc(doc(fireStore, "users", userData.uid), {
                id: userData.uid,
                firstname: capitalizeWord(user.firstname.trim()),
                lastname: capitalizeWord(user.lastname.trim()),
                email: user.email,
                username: user.username.trim(),
                followers: [],
                following: [],
                claps: 0,
                joinDate: new Date(),
                avatarColor: getRandomColor()
            });
            
            // Show success message to the user
            toast.success('Joined !', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            
        } catch (e) {

            // If Email in use
            if (e == "FirebaseError: Firebase: Error (auth/email-already-in-use).") {
    
                toast.error('Email is already used', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    } else {

        // Username is already used
        toast.error('Username is already used', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

}

export { createUser }