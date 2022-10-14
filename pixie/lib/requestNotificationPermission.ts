import { sendNotification } from "./sendNotification";

export const requestNotificationPermission = () => {
    let permission: NotificationPermission = Notification.permission;

    if(permission !== "granted"){
        Notification.requestPermission(function (permission: NotificationPermission) {
            if (permission === "granted") {
                sendNotification({
                    title: "Shibhouse",
                    body: "Thanks for allowing notifications. We sincerely appreciate it."
                })
            }
        });
    }
}