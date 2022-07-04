import { fireStore } from "../auth/Firebase";
import { getDoc, doc } from "firebase/firestore";

const isRoomSpeaker = async (user, roomID: string) => {

    const docRef = doc(fireStore, "rooms", roomID);
    const docSnap = await getDoc(docRef);

    var data = docSnap.data()
    var speakers = data.speakers
    return speakers.includes(user)

}

export default isRoomSpeaker