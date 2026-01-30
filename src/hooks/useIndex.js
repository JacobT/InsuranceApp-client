import { useFetchData } from "@/hooks/useFetchData";
import { useHandleDelete } from "@/hooks/useHandleDelete";

export const useIndex = (url) => {
    const { data, errors, setErrors, refresh } = useFetchData({ url });

    const handleDelete = useHandleDelete(setErrors);

    return {
        data,
        errors,
        handleDelete: (url) => handleDelete({ url, callBack: refresh }),
    };
};
