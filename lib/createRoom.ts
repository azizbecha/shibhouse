import uuid from 'uuid-random'
import { useRouter } from 'next/router'
import { fireStore } from '../auth/Firebase'
import { collection, addDoc } from "firebase/firestore"; 
import { NewRoom } from '../interfaces';

const createRoom = async (data: NewRoom) => {
    const router = useRouter()

    const roomId = uuid()
    const docRef = await addDoc(collection(fireStore, "rooms"), {
        createdAt: new Date(),
        createdBy: data.createdBy,
        title: data.title,
        description: data.description,
        pinnedLink: data.pinnedLink,
        topics: data.topics
    });
    router.push(`/room/${roomId}`)
}

export default createRoom