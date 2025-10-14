import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApi } from "../../../hooks/useApi";
import { handleError } from "../../../utils/handleError";
import { useFetchData } from "../../../hooks/useFetchData";

export const useCustomerDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { apiDelete } = useApi();
    const [errors, setErrors] = useState({ general: [] });
    const { dataState: customer } = useFetchData({
        url: `/customers/${id}`,
        externalErrorState: [errors, setErrors],
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

    return { id, customer, errors, handleDelete };
};
