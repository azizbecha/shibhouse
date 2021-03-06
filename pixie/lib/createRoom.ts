import { doc, setDoc } from "firebase/firestore"
import { fireStore } from '../auth/Firebase'
import { NewRoom } from '../interfaces'

const createRoom = async (data: NewRoom): Promise<void> => {

    const docRef = await setDoc(doc(fireStore, "rooms", data.id), {
        id: data.id,
        createdAt: Date.now(),
        lastPing: Date.now(),
        createdBy: data.createdBy,
        title: data.title,
        description: data.description,
        pinnedLink: data.pinnedLink,
        topics: data.topics,
        users: 0,
        allowChat: data.allowChat,
        speakers: data.speakers
    });
}

export default createRoom