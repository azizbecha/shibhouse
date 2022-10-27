import { createUserWithEmailAndPassword, User } from 'firebase/auth'
import { collection, doc, DocumentData, getDocs, Query, query, QuerySnapshot, setDoc, where } from "firebase/firestore"; 

import toast from "react-hot-toast";

import getCurrentUserData from "./getCurrentUserData";
import { auth, fireStore } from '../auth/Firebase'
import { capitalizeWord } from "./capitalize";
import { getRandomColor } from "./getRandomColor";
import { createNotification } from './createNotification';
import { NewUser } from "../interfaces"

import isEmail from 'validator/lib/isEmail';
import isStrongPassword from 'validator/lib/isStrongPassword';
import isAlpha from 'validator/lib/isAlpha';
import equals from 'validator/lib/equals'

const createUser = async (user: NewUser): Promise<void> => {

    const passwordOptions = { 
        minLength: 8,
        minLowercase: 0,
        minUppercase: 0,
        minNumbers: 0,
        minSymbols: 0,
        returnScore: false,
        pointsPerUnique: 1,
        pointsPerRepeat: 0.5,
        pointsForContainingLower: 10,
        pointsForContainingUpper: 10,
        pointsForContainingNumber: 10,
        pointsForContainingSymbol: 10 
    }

    // Clear username from right and left spaces, then replace spaces with underscores (_)
    const username = user.username;
    username.trim();
    username.replace(/\s+/g,"_");
    username.toLowerCase();
    
    // Check if there is a user with the same username
    const q: Query<DocumentData> = query(collection(fireStore, "users"), where("username", "==", username));
    const queryData: QuerySnapshot<DocumentData> = await getDocs(q);
    const users = queryData.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    // If username is not used
    if (users.length == 0) {

        // If email is valid
        if (isEmail(user.email)) {

            // If password is strong
            if (isStrongPassword(user.password, passwordOptions)) {

                // If passwords match
                if(equals(user.password, user.confirmpassword)) {

                    // If firstname does not contain numbers
                    if (isAlpha(user.firstname)) {

                        // If lastname does not contain numbers
                        if (isAlpha(user.lastname)) {

                            // If email is not username
                            if (!equals(username, user.email)) {

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
                                        username: username,
                                        followers: [],
                                        following: [],
                                        claps: 0,
                                        joinDate: new Date(),
                                        avatarColor: getRandomColor()
                                    });

                                    createNotification(`@${username} joined Shibhouse`);
                                    
                                    // Show success message to the user
                                    toast.success('Joined !');
                                    
                                } catch (e) {

                                    // If Email in use
                                    if (e == "FirebaseError: Firebase: Error (auth/email-already-in-use).") {
                                        toast.error('Email is already used');
                                    }
                                }
                            } else {
                                // If username is email
                                toast.error('Username cannot be your email');
                            }
                        } else {

                            // If lastname is not strong
                            toast.error('Lastname cannot contain numbers');
                        }
                    } else {
                        // If firstname is not strong
                        toast.error('Firstname cannot contain numbers');
                    }
                } else {
                    // if passwords does not match
                    toast.error("Passwords does not match")
                }
            } else {
                // If password is not strong
                toast.error('Weak password');
            }
        } else {
            // If email is not valid
            toast.error('Invalid email');
        }
    } else {
        // Username is already used
        toast.error('Username is already used');
    }

}

export { createUser }