self.addEventListener("push", (event) => {
    let data = {
        title: "StaWro",
        message: "You have a new notification"
    };

    if (event.data) {
        data = event.data.json();
    }

    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.message,
            icon: "/logo192.png",
            badge: "/logo192.png"
        })
    );
});