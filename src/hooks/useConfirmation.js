import { useRef, useState } from "react";

export const useConfirmation = () => {
    const [options, setOptions] = useState(null);
    const resolveRef = useRef(null);

    const confirm = ({ title, message }) =>
        new Promise((resolve) => {
            setOptions({
                title,
                message,
            });
            resolveRef.current = resolve;
        });

    const onClick = (result) => {
        if (resolveRef.current) {
            resolveRef.current(result);
            resolveRef.current = null;
        }
        setOptions(null);
    };

    return {
        dialogOptions: options,
        dialogActions: {
            confirm: () => onClick(true),
            deny: () => onClick(false),
        },
        confirm,
    };
};
