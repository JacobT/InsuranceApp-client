import { useNotificationContext } from "@/contexts/NotificationContext";
import { NOTIFICATION_TYPES } from "../utils/constants";

const Notification = () => {
    const { messages, clearMessage } = useNotificationContext();

    return (
        <div className="fixed-alertbox">
            {messages.map((message) => (
                <div
                    key={message.id}
                    className={`alert text-center alert-${message.type}
                        ${
                            message.type === NOTIFICATION_TYPES.ERROR
                                ? "fixed-alert-dismissable alert-dismissible"
                                : "fixed-alert"
                        }`}
                >
                    {message.text}
                    {message.type === NOTIFICATION_TYPES.ERROR && (
                        <button
                            type="btn"
                            className="btn-close"
                            onClick={() => clearMessage(message.id)}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default Notification;
