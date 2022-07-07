import { fireStore } from "../auth/Firebase";
import { getDoc, doc, DocumentReference, DocumentData, DocumentSnapshot } from "firebase/firestore";

const getUsername = async (userID: string) => {

    const docRef: DocumentReference<DocumentData> = doc(fireStore, "users", userID);
    const docSnap: DocumentSnapshot<DocumentData> = await getDoc(docRef);
    return docSnap.data().username
}

export default getUsername