import { fireStore } from '../auth/Firebase'
import { doc, setDoc } from "firebase/firestore"; 
import { NewRoom } from '../interfaces';

const createRoom = async (data: NewRoom) => {

    const docRef = await setDoc(doc(fireStore, "rooms", data.id), {
        id: data.id,
        createdAt: Date.now(),
        createdBy: data.createdBy,
        title: data.title,
        description: data.description,
        pinnedLink: data.pinnedLink,
        topics: data.topics
    });
}

export default createRoom