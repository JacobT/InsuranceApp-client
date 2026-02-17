import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/contexts/AuthContext";
import { createEmptyErrorsState, handleError } from "@/utils/handleError";
import { useNotificationContext } from "@/contexts/NotificationContext";
import { PAGE_MODES } from "@/utils/constants";

export const useAuthForm = (mode) => {
    const { register, login } = useAuthContext();
    const { addErrorMessage } = useNotificationContext();
    const navigate = useNavigate();

    const [errors, setErrors] = useState(createEmptyErrorsState());
    const [formState, setForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors(createEmptyErrorsState());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors(createEmptyErrorsState());
        const { confirmPassword, ...payload } = formState;
        if (
            mode === PAGE_MODES.REGISTER &&
            confirmPassword != payload.password
        ) {
            setErrors((prev) => ({
                ...prev,
                confirmPassword: ["Passwords don't match."],
            }));

            return;
        }

        try {
            if (mode === PAGE_MODES.REGISTER) {
                await register(payload);
            } else {
                await login(payload);
            }
            navigate("/");
        } catch (error) {
            const newErrors = await handleError(error);
            setErrors(newErrors);

            newErrors.general.forEach((e) => {
                addErrorMessage(e);
            });
        }
    };

    return { formState, errors, handleChange, handleSubmit };
};
