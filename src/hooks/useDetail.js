import { useNavigate, useParams } from "react-router-dom";
import { useFetchData } from "./useFetchData";
import { handleError } from "../utils/handleError";
import { useApi } from "./useApi";

export const useDetail = (url) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { apiDelete } = useApi();

    const { data, errors, setErrors } = useFetchData({ url: `${url}/${id}` });

    const handleDelete = async () => {
        if (confirm("Do you want to delete this item?")) {
            try {
                await apiDelete(`${url}/${id}`);
                navigate(-1);
            } catch (error) {
                const newErrors = await handleError(error);
                setErrors(newErrors);
            }
        }
    };

    return {
        id,
        data,
        errors,
        handleDelete,
    };
};
