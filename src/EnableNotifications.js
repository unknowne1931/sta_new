import React, { useEffect, useState } from "react";

function EnableNotifications() {

    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    async function enableNotifications() {

        try {

            setLoading(true);
            setStatus("");

            // Check browser support
            if (!("Notification" in window)) {
                setStatus(
                    "Notifications are not supported by this browser."
                );
                return;
            }

            if (!("serviceWorker" in navigator)) {
                setStatus(
                    "Service Workers are not supported by this browser."
                );
                return;
            }

            if (!("PushManager" in window)) {
                setStatus(
                    "Push notifications are not supported."
                );
                return;
            }

            // Ask permission
            const permission =
                await Notification.requestPermission();

            console.log("Notification permission:", permission);

            if (permission !== "granted") {

                setStatus(
                    "Notification permission was not granted."
                );

                return;
            }

            // Get Service Worker
            const registration =
                await navigator.serviceWorker.ready;

            console.log(
                "Service Worker ready:",
                registration
            );

            // Your VAPID PUBLIC KEY
            const publicKey = "BNpCHYbsI9XNFi0VsRddAW9pLNUtpgX7B-WTyU-YqWlHLUfTBLQTP_yFrJOLJYbZBJi_tOrPbz2Y6jwt52euzwA";

            if (!publicKey) {
                throw new Error(
                    "VAPID public key is missing."
                );
            }

            // Create push subscription
            const subscription =
                await registration.pushManager.subscribe({

                    userVisibleOnly: true,

                    applicationServerKey:
                        urlBase64ToUint8Array(publicKey)

                });

            console.log(
                "Push subscription:",
                subscription
            );

            // Send subscription to backend
            const response = await fetch(
                "http://192.168.31.133/api/notifications/subscribe",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify(subscription)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to save subscription."
                );
            }

            setStatus(
                "Notifications enabled successfully!"
            );

        } catch (error) {

            console.error(
                "Notification error:",
                error
            );

            setStatus(
                error.message ||
                "Failed to enable notifications."
            );

        } finally {

            setLoading(false);

        }
    };


    // Convert VAPID key
    function urlBase64ToUint8Array(base64String) {

        const padding =
            "=".repeat(
                (4 - base64String.length % 4) % 4
            );

        const base64 =
            (
                base64String
                    .replace(/-/g, "+")
                    .replace(/_/g, "/") +
                padding
            );

        const rawData =
            window.atob(base64);

        return Uint8Array.from(
            [...rawData].map(
                char => char.charCodeAt(0)
            )
        );
    }

    return (
        <div>

            <button
                onClick={enableNotifications}
                disabled={loading}
            >
                {loading
                    ? "Enabling..."
                    : "🔔 Enable Notifications"}
            </button>

            {status && (
                <p>{status}</p>
            )}

        </div>
    );
}

export default EnableNotifications;