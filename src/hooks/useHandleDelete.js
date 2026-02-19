import { handleError } from "@/utils/handleError";
import { useApi } from "@/hooks/useApi";
import { useNotificationContext } from "@/contexts/NotificationContext";
import { useConfirmationContext } from "@/contexts/ConfirmationContext";

export const useHandleDelete = (setErrors) => {
    const { apiDelete } = useApi();
    const { addSuccessMessage, addErrorMessage } = useNotificationContext();
    const confirmAction = useConfirmationContext();

    const handleDelete = async ({ url, callBack }) => {
        if (
            await confirmAction({
                title: "Do you want to delete this item?",
            })
        ) {
            try {
                await apiDelete(url);
                if (callBack) callBack();
                addSuccessMessage("Item succesfully deleted.");
            } catch (error) {
                const newErrors = await handleError(error);
                setErrors(newErrors);

                newErrors.general.forEach((e) => {
                    addErrorMessage(e);
                });
            }
        }
    };

    return handleDelete;
};
