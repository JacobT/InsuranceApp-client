import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useApi } from "../../../hooks/useApi";
import { handleError } from "../../../utils/handleError";
import customerErrors from "../../../utils/errors/customerErrors";

export const useCustomerForm = (mode) => {
    const navigate = useNavigate();
    const { apiGet, apiPost, apiPut } = useApi();
    const { id } = useParams();
    const { state } = useLocation();
    const createEmptyCustomer = () => ({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        street: "",
        city: "",
        postalCode: "",
    });

    const [customer, setCustomer] = useState(
        state?.customerState ? state.customerState : createEmptyCustomer()
    );
    const [errors, setErrors] = useState(
        customerErrors.createEmptyErrorsState()
    );

    useEffect(() => {
        const getCustomer = async () => {
            try {
                const response = await apiGet(`/customers/${id}`);
                if (response) {
                    const customer = await response.json();
                    setCustomer(customer);
                }
            } catch (error) {
                const newErrors = await handleError(error, customerErrors);
                setErrors(newErrors);
            }
        };
        if (!state?.customerState && id) getCustomer();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomer((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: [], general: [] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (mode === "create") {
                await apiPost("/customers", customer);
            } else {
                await apiPut(`/customers/${id}`, customer);
            }
            navigate(`/customers/${id}`);
        } catch (error) {
            const newErrors = await handleError(error, customerErrors);
            setErrors(newErrors);
        }
    };

    return {
        customerState: customer,
        errorsState: errors,
        handleChange,
        handleSubmit,
    };
};
