import { handleError } from "@/utils/handleError";
import { useApi } from "@/hooks/useApi";

export const useHandleDelete = (setErrors) => {
    const { apiDelete } = useApi();

    const handleDelete = async ({ url, callBack }) => {
        if (confirm("Do you want to delete this item?")) {
            try {
                await apiDelete(url);
                if (callBack) callBack();
            } catch (error) {
                const newErrors = await handleError(error);
                setErrors(newErrors);
            }
        }
    };

    return handleDelete;
};
