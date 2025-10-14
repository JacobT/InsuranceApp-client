import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApi } from "../../../hooks/useApi";
import { handleError } from "../../../utils/handleError";

export const useCustomerDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { apiGet, apiDelete } = useApi();
    const [customer, setCustomer] = useState([]);
    const [errors, setErrors] = useState({ general: [] });

    useEffect(() => {
        const getCustomerDetail = async () => {
            try {
                const response = await apiGet(`/customers/${id}`);
                if (response) {
                    const customer = await response.json();
                    setCustomer(customer);
                }
            } catch (error) {
                const newErrors = await handleError(error);
                setErrors(newErrors);
            }
        };
        getCustomerDetail();
    }, []);

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
