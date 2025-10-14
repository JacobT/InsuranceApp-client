import { useEffect, useState } from "react";
import { useApi } from "./useApi";
import { handleError } from "../utils/handleError";

export const useFetchData = ({
    url,
    dependencies = [],
    customErrors = null,
    externalDataState = null,
    externalErrorState = null,
    enabled = true,
}) => {
    const { apiGet } = useApi();
    const [dataState, setData] = externalDataState || useState([]);
    const [errorsState, setErrors] =
        externalErrorState ||
        useState(
            customErrors
                ? customErrors.createEmptyErrorState()
                : { general: [] }
        );

    useEffect(() => {
        let isMounted = true;

        const getData = async () => {
            try {
                const response = await apiGet(url);
                if (response) {
                    const data = await response.json();
                    if (isMounted) setData(data);
                }
            } catch (error) {
                if (!isMounted) return;
                const newErrors = await handleError(error, customErrors);
                setErrors(newErrors);
            }
        };
        if (enabled) getData();

        return () => (isMounted = false);
    }, dependencies);

    return { dataState, setData, errorsState, setErrors };
};
