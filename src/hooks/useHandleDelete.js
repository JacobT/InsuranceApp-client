import { handleError } from "@/utils/handleError";
import { useApi } from "@/hooks/useApi";
import { useNotificationContext } from "@/contexts/NotificationContext";

export const useHandleDelete = (setErrors) => {
    const { apiDelete } = useApi();
    const { addSuccessMessage } = useNotificationContext();

    const handleDelete = async ({ url, callBack }) => {
        if (confirm("Do you want to delete this item?")) {
            try {
                await apiDelete(url);
                if (callBack) callBack();
                addSuccessMessage("Item succesfully deleted.");
            } catch (error) {
                const newErrors = await handleError(error);
                setErrors(newErrors);
            }
        }
    };

    return handleDelete;
};
