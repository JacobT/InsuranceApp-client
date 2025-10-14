import { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useApi } from "../../../hooks/useApi";
import { handleError } from "../../../utils/handleError";
import customerErrors from "../../../utils/errors/customerErrors";
import { useFetchData } from "../../../hooks/useFetchData";

export const useCustomerForm = () => {
    const navigate = useNavigate();
    const { apiPost, apiPut } = useApi();
    const { id } = useParams();
    const { state } = useLocation();
    const mode = !state?.customerState && !id ? "create" : "edit";
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

    useFetchData({
        url: `/customers/${id}`,
        externalDataState: [customer, setCustomer],
        externalErrorState: [errors, setErrors],
        customErrors: customerErrors,
        enabled: mode === "edit",
    });

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
