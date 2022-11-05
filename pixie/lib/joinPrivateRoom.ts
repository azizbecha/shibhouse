import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { fireStore } from "../auth/Firebase";

export const joinPrivateRoom = async (id: string, router) => {

    id.trim();

    const docRef = doc(fireStore, "rooms", `${id}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        toast.success("Room exists");
        router.push(`room/${id}`);

    } else {
        toast.error("Room does not exist");
    }
}