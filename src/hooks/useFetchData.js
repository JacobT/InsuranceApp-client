import { useEffect, useRef, useState } from "react";
import { useApi } from "@/hooks/useApi";
import { createEmptyErrorsState, handleError } from "@/utils/handleError";
import { useNotificationContext } from "@/contexts/NotificationContext";

export const useFetchData = ({
    url,
    params,
    dependencies = [],
    externalDataState = null,
    externalErrorState = null,
    enabled = true,
}) => {
    const { apiGet } = useApi();
    const { addErrorMessage } = useNotificationContext();
    const [data, setData] = externalDataState || useState([]);
    const [errors, setErrors] =
        externalErrorState || useState(createEmptyErrorsState());

    const mounted = useRef(true);

    const [refreshKey, setRefreshKey] = useState(0);
    const refresh = () => setRefreshKey(refreshKey + 1);

    useEffect(() => {
        mounted.current = true;
        if (!enabled) return;

        const getData = async () => {
            try {
                const response = await apiGet(url, params);
                const data = await response.json();
                if (mounted.current) {
                    setData(data);
                }
            } catch (error) {
                if (!mounted.current) return;

                const newErrors = await handleError(error);
                setErrors(newErrors);

                newErrors.general.forEach((e) => {
                    addErrorMessage(e);
                });
            }
        };
        getData();

        return () => (mounted.current = false);
    }, [url, enabled, params, refreshKey, ...dependencies]);

    return { data, setData, errors, setErrors, refresh };
};
