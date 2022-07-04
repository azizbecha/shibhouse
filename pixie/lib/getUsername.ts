import { fireStore } from "../auth/Firebase";
import { getDoc, doc } from "firebase/firestore";

const getUsername = async (userID: string) => {

    const docRef = doc(fireStore, "users", userID);
    const docSnap = await getDoc(docRef);
    return docSnap.data().username
}

export default getUsername