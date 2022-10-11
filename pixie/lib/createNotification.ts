import { doc, setDoc } from "firebase/firestore";
import { fireStore } from "../auth/Firebase";
import generateId from "./generateId";

export const createNotification = async (text: string) => {
    const id: string = generateId(8);

    const docRef = await setDoc(doc(fireStore, "notifications", id), {
        id: id,
        text: text,
        date: Date.now().toString()
    });
}