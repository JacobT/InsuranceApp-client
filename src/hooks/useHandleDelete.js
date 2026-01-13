import { useNavigate } from "react-router-dom";
import { handleError } from "@/utils/handleError";
import { useApi } from "@/hooks/useApi";

export const useHandleDelete = (setErrors) => {
    const navigate = useNavigate();
    const { apiDelete } = useApi();

    const handleDelete = async ({ url, redirect }) => {
        if (confirm("Do you want to delete this item?")) {
            try {
                await apiDelete(url);
                if (redirect) navigate(redirect);
            } catch (error) {
                const newErrors = await handleError(error);
                setErrors(newErrors);
            }
        }
    };

    return handleDelete;
};
