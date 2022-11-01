import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { fireStore } from "../auth/Firebase";

import { createNotification } from "./createNotification";
import generateId from "./generateId";

import { ScheduledRoomProps } from "../interfaces";

export const scheduleRoom = async (props: ScheduledRoomProps) => {
    const id = generateId(10);
    try {
        const docRef = await setDoc(doc(fireStore, "scheduledRooms", id), {
            id: id,
            date: new Date(props.date+" "+props.time),
            day: props.date,
            time: props.time,
            createdBy: props.createdBy,
            title: props.title,
        });
    
        createNotification(`@${props.createdBy} scheduled a room.`);
        toast.success("Your room has been Scheduled");
    } catch (e) {
        toast.error("An error occured during scheduling your room");
    }
}