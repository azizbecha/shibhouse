import { NotificationProps } from "../interfaces";

export const sendNotification = (props: NotificationProps) => {
    Notification.requestPermission(function (permission: NotificationPermission) {
        if (permission === "granted") {
            let title: string = props.title;
            
            new Notification(title, props);
        }
    });
}