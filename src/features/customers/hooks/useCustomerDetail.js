import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApi } from "../../../hooks/useApi";
import { handleError } from "../../../utils/handleError";
import { useFetchData } from "../../../hooks/useFetchData";

export const useCustomerDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { apiDelete } = useApi();
    const [customerErrors, setcustomerErrors] = useState({ general: [] });

    const { dataState: customer } = useFetchData({
        url: `/customers/${id}`,
        externalErrorState: [customerErrors, setcustomerErrors],
    });

    const { dataState: insurances, errorsState: insurancesErrors } =
        useFetchData({
            url: `/customers/${id}/insurances`,
        });

    const handleDelete = async () => {
        if (confirm("Do you want to delete this customer?")) {
            try {
                await apiDelete(`/customers/${id}`);
                navigate("/customers");
            } catch (error) {
                const newErrors = await handleError(error);
                alert(newErrors.general);
            }
        }
    };

    return {
        id,
        customer,
        customerErrors,
        insurances,
        insurancesErrors,
        handleDelete,
    };
};
