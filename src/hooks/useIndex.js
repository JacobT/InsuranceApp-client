import { useFetchData } from "@/hooks/useFetchData";
import { useHandleDelete } from "@/hooks/useHandleDelete";
import { useSearchParams } from "react-router-dom";

export const useIndex = (url) => {
    const [params, setParams] = useSearchParams();
    const { data, errors, setErrors, refresh } = useFetchData({ url, params });

    const handleDelete = useHandleDelete(setErrors);

    return {
        data,
        errors,
        handleDelete: (url) => handleDelete({ url, callBack: refresh }),
        setParams,
    };
};
