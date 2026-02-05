import { useParams } from "react-router-dom";
import { useFetchData } from "@/hooks/useFetchData";
import { useHandleDelete } from "./useHandleDelete";

export const useDetail = (url) => {
    const { id } = useParams();
    const { data, errors, setErrors, refresh } = useFetchData({
        url: `${url}/${id}`,
    });
    const handleDelete = useHandleDelete(setErrors);

    return {
        id,
        data,
        errors,
        handleDelete,
        refresh,
    };
};
