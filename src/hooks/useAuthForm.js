import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { handleError } from "../utils/handleError";
import identityErrors from "../utils/errors/identityErrors";

export const useAuthForm = (mode) => {
    const { register, login } = useAuthContext();
    const navigate = useNavigate();

    const [errorsState, setErrors] = useState(
        identityErrors.createEmptyErrorsState()
    );
    const [formState, setForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: [], general: [] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors(identityErrors.createEmptyErrorsState());
        const { confirmPassword, ...payload } = formState;
        if (mode === "register" && confirmPassword != payload.password) {
            setErrors((prev) => ({
                ...prev,
                confirmPassword: ["Passwords don't match."],
            }));

            return;
        }

        try {
            if (mode === "register") {
                await register(payload);
            } else {
                await login(payload);
            }
            navigate("/");
        } catch (error) {
            const newErrors = await handleError(error, identityErrors);
            setErrors(newErrors);
        }
    };

    return { formState, errorsState, handleChange, handleSubmit };
};
