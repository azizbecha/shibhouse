import { createUserWithEmailAndPassword, User } from 'firebase/auth'
import { collection, doc, DocumentData, getDocs, Query, query, QuerySnapshot, setDoc, where } from "firebase/firestore"; 

import { toast } from "react-toastify";

import getCurrentUserData from "./getCurrentUserData";
import { auth, fireStore } from '../auth/Firebase'
import { capitalizeWord } from "./capitalize";
import { getRandomColor } from "./getRandomColor";
import { NewUser } from "../interfaces"

import isEmail from 'validator/lib/isEmail';
import isStrongPassword from 'validator/lib/isStrongPassword';
import isAlpha from 'validator/lib/isAlpha';
import { createNotification } from './createNotification';

const createUser = async (user: NewUser): Promise<void> => {

    const passwordOptions = { 
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0,
        returnScore: false,
        pointsPerUnique: 1,
        pointsPerRepeat: 0.5,
        pointsForContainingLower: 10,
        pointsForContainingUpper: 10,
        pointsForContainingNumber: 10,
        pointsForContainingSymbol: 10 
    }

    // Check if there is a user with the same username
    const q: Query<DocumentData> = query(collection(fireStore, "users"), where("username", "==", user.username));
    const queryData: QuerySnapshot<DocumentData> = await getDocs(q);
    const users = queryData.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    // If username is not used
    if (users.length == 0) {

        // If email is valid
        if (isEmail(user.email)) {

            // If password is strong
            if (isStrongPassword(user.password, passwordOptions)) {

                if (isAlpha(user.firstname)) {
                    if (isAlpha(user.lastname)) {
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

                            createNotification(`@${user.username.trim()} joined Shibhouse`);
                            
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
                                toast.warning('Email is already used', {
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

                        // If lastname is not strong
                        toast.warning('Lastname cannot contain numbers', {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                } else {

                    // If firstname is not strong
                    toast.warning('Firstname cannot contain numbers', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            } else {

                // If password is not strong
                toast.warning('Weak password', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } else {

            // If email is not valid
            toast.warning('Invalid email', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
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