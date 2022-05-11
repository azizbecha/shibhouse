import { fireStore } from "../auth/Firebase";
import { getDoc, doc } from "firebase/firestore";

const getUserData = async (userID) => {

    var data = {}
    const docRef = doc(fireStore, "users", userID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        data = docSnap.data();
    } else {
        // doc.data() will be undefined in this case
        console.log("User not found");
    }

    return data
}

export default getUserData