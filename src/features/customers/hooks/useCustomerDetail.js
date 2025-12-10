import { useParams, useNavigate } from "react-router-dom";
import { useApi } from "../../../hooks/useApi";
import { handleError } from "../../../utils/handleError";
import { useFetchData } from "../../../hooks/useFetchData";

export const useCustomerDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { apiDelete } = useApi();

    const {
        data: customer,
        errors: customerErrors,
        setErrors: setCustomerErrors,
    } = useFetchData({ url: `/customers/${id}` });

    const handleDelete = async () => {
        if (confirm("Do you want to delete this customer?")) {
            try {
                await apiDelete(`/customers/${id}`);
                navigate("/customers");
            } catch (error) {
                const newErrors = await handleError(error);
                setCustomerErrors(newErrors);
            }
        }
    };

    return {
        id,
        customer,
        customerErrors,
        handleDelete,
    };
};
