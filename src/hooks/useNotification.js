import { useRef, useState } from "react";
import { NOTIFICATION_TYPES } from "../utils/constants";

export const useNotification = () => {
    const [messages, setMessages] = useState([]);
    const nextId = useRef(0);

    const addMessage = ({ type, text }) => {
        const id = nextId.current++;

        setMessages((prev) => [...prev, { id, type, text }]);

        if (type === NOTIFICATION_TYPES.ERROR) return;

        setTimeout(() => {
            clearMessage(id);
        }, 4000);
    };

    const clearMessage = (id) => {
        setMessages((prev) => prev.filter((m) => m.id !== id));
    };

    return {
        messages,
        addSuccessMessage: (text) =>
            addMessage({ type: NOTIFICATION_TYPES.SUCCESS, text }),
        addErrorMessage: (text) =>
            addMessage({ type: NOTIFICATION_TYPES.ERROR, text }),
        clearMessage,
    };
};

// const [error, setError] = useState([]);

// const addError = (message) => {
//     setError((prev) =>
//         error.includes(message) ? prev : [...prev, message],
//     );
// };

// const clearError = (messageToClear) => {
//     setError((prev) => prev.filter((m) => m !== messageToClear));
// };

// error,
// addError,
// clearError,
