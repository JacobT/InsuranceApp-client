import { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useApi } from "./useApi";
import { handleError } from "../utils/handleError";
import { useFetchData } from "./useFetchData";

export const useForm = ({ url, customErrors = null }) => {
    const navigate = useNavigate();
    const { apiPost, apiPut } = useApi();
    const { id } = useParams();
    const { state } = useLocation();
    const mode = state?.dataState || id ? "edit" : "create";

    const [dataState, setDataState] = useState(state?.dataState ?? {});
    const [errorsState, setErrorsState] = useState(
        customErrors.createEmptyErrorsState()
    );

    useFetchData({
        url: `${url}/${id}`,
        externalDataState: [dataState, setDataState],
        externalErrorState: [errorsState, setErrorsState],
        customErrors,
        enabled: mode === "edit",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataState((prev) => ({ ...prev, [name]: value }));
        setErrorsState((prev) => ({ ...prev, [name]: [], general: [] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let response;
            if (mode === "create") {
                response = await apiPost(url, dataState);
            } else {
                response = await apiPut(`${url}/${id}`, dataState);
            }
            const responseData = await response.json();
            navigate(`${url}/${responseData.id}`);
        } catch (error) {
            const newErrors = await handleError(error, customErrors);
            setErrorsState(newErrors);
        }
    };

    return {
        mode,
        dataState,
        errorsState,
        handleChange,
        handleSubmit,
    };
};
