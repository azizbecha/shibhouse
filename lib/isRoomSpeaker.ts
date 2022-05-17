import { fireStore } from "../auth/Firebase";
import { getDoc, doc } from "firebase/firestore";

const isRoomSpeaker = async (user, room) => {

    const docRef = doc(fireStore, "rooms", room);
    const docSnap = await getDoc(docRef);

    var data = docSnap.data()
    var speakers = data.speakers
    return speakers.includes(user)

}

export default isRoomSpeaker