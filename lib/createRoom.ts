import { fireStore } from '../auth/Firebase'
import { collection, addDoc } from "firebase/firestore"; 
import { NewRoom } from '../interfaces';

const createRoom = async (data: NewRoom) => {

    const docRef = await addDoc(collection(fireStore, "rooms", data.id), {
        createdAt: new Date(),
        createdBy: data.createdBy,
        title: data.title,
        description: data.description,
        pinnedLink: data.pinnedLink,
        topics: data.topics
    });
}

export default createRoom