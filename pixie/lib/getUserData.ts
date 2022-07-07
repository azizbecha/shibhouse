import { fireStore } from "../auth/Firebase";
import { getDoc, doc, DocumentReference, DocumentData, DocumentSnapshot } from "firebase/firestore";

const getUserData = async (userID: string) => {

    var data = {}
    const docRef: DocumentReference<DocumentData> = doc(fireStore, "users", userID);
    const docSnap: DocumentSnapshot<DocumentData> = await getDoc(docRef);

    if (docSnap.exists()) {
        data = docSnap.data();
    }
    return data

}

export default getUserData