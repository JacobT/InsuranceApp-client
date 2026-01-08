import { useEffect, useRef, useState } from "react";
import { useApi } from "@/hooks/useApi";
import { createEmptyErrorsState, handleError } from "@/utils/handleError";

export const useFetchData = ({
    url,
    dependencies = [],
    externalDataState = null,
    externalErrorState = null,
    enabled = true,
}) => {
    const { apiGet } = useApi();
    const [data, setData] = externalDataState || useState([]);
    const [errors, setErrors] =
        externalErrorState || useState(createEmptyErrorsState());

    const mounted = useRef(true);

    useEffect(() => {
        mounted.current = true;
        if (!enabled) return;

        const getData = async () => {
            try {
                const response = await apiGet(url);
                const data = await response.json();
                if (mounted.current) {
                    setData(data);
                }
            } catch (error) {
                if (!mounted.current) return;

                const newErrors = await handleError(error);
                setErrors(newErrors);
            }
        };
        getData();

        return () => (mounted.current = false);
    }, [url, enabled, ...dependencies]);

    return { data, setData, errors, setErrors };
};
