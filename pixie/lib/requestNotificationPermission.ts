export const requestNotificationPermission = () => {
    let permission: NotificationPermission = Notification.permission;

    if(permission !== "granted"){
        Notification.requestPermission(function (permission: NotificationPermission) {
            if (permission === "granted") {
                let title = "Shibhouse";

                let icon = '../images/icon.ico';
                
                let body = "Thanks for allowing notifications. We sincerely appreciate it.";
                
                var notification = new Notification(title, { body, icon });
            }
        });
    }
}