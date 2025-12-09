import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApi } from "../../../hooks/useApi";
import { handleError } from "../../../utils/handleError";
import { useFetchData } from "../../../hooks/useFetchData";

export const useCustomerDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { apiDelete } = useApi();
    const [customerErrors, setCustomerErrors] = useState({ general: [] });

    const { data: customer } = useFetchData({
        url: `/customers/${id}`,
        externalErrorState: [customerErrors, setCustomerErrors],
    });

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
