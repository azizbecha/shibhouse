import { doc, setDoc } from "firebase/firestore";
import { fireStore } from "../auth/Firebase";
import generateId from "./generateId";

export const createNotification = async (text: string) => {
    const id: string = generateId(8);
    var today: Date = new Date();
    var date = today.toJSON().slice(0, 10);
    var finalDate = date.slice(8, 10) + '/' + date.slice(5, 7) + '/' + date.slice(0, 4);

    const docRef = await setDoc(doc(fireStore, "notifications", id), {
        id: id,
        text: text,
        date: finalDate
    });
}