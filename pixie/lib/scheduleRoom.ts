import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { fireStore } from "../auth/Firebase";
import { ScheduledRoomProps } from "../interfaces";
import { createNotification } from "./createNotification";
import generateId from "./generateId";

export const scheduleRoom = async (props: ScheduledRoomProps) => {
    const id = generateId(10);
    const docRef = await setDoc(doc(fireStore, "scheduledRooms", id), {
        id: id,
        date: new Date(props.date+" "+props.time),
        createdBy: props.createdBy,
        title: props.title,
        description: props.description,
    });

    createNotification(`@${props.createdBy} scheduled a room`);
    toast.success("Your room has been Scheduled")
}