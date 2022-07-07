import { addDoc, collection } from "firebase/firestore";
import { fireStore } from "../auth/Firebase";

const sendBotMessage = (roomId: string, message: string): void => {
    
        // Remove spaces in start/end of message
        message.trim();

        // Make sure that message is not empty
        if (message.length > 0) {
            addDoc(collection(fireStore, 'rooms', `${roomId}/messages`), {
                message: message.trim(),
                sendTime: new Date().getTime(),
                sentBy: 'ShibhouseBOT',
                roomId: roomId,
                isBot: true
            })
        }
}

export { sendBotMessage }