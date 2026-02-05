import { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useApi } from "@/hooks/useApi";
import { createEmptyErrorsState, handleError } from "@/utils/handleError";
import { useFetchData } from "@/hooks/useFetchData";
import { useNotificationContext } from "@/contexts/NotificationContext";
import { PAGE_MODES } from "@/utils/constants";

export const useForm = (url) => {
    const navigate = useNavigate();
    const { addSuccessMessage, addErrorMessage } = useNotificationContext();
    const { apiPost, apiPut } = useApi();
    const { id } = useParams();
    const { state } = useLocation();
    const mode = id ? PAGE_MODES.EDIT : PAGE_MODES.CREATE;

    const [data, setData] = useState(state?.formData ?? {});
    const [errors, setErrors] = useState(createEmptyErrorsState());

    useFetchData({
        url: `${url}/${id}`,
        externalDataState: [data, setData],
        externalErrorState: [errors, setErrors],
        enabled: mode === PAGE_MODES.EDIT,
    });

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        setData((prev) => ({
            ...prev,
            [name]: type === "date" && value === "" ? null : value,
        }));
        setErrors((prev) => ({ ...prev, [name]: [], general: [] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let response;
            if (mode === PAGE_MODES.CREATE) {
                response = await apiPost(url, data);
            } else {
                response = await apiPut(`${url}/${id}`, data);
            }
            const responseData = await response.json();
            navigate(`${url}/${responseData.id}`);

            addSuccessMessage(
                `Item successfully ${mode === PAGE_MODES.CREATE ? "created" : "edited"}.`,
            );
        } catch (error) {
            const newErrors = await handleError(error);
            setErrors(newErrors);

            newErrors.general.forEach((e) => {
                addErrorMessage(e);
            });
        }
    };

    return {
        mode,
        data,
        errors,
        handleChange,
        handleSubmit,
    };
};
