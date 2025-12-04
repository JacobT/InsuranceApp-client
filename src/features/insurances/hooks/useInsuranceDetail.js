import { useFetchData } from "../../../hooks/useFetchData";
import { useNavigate, useParams, Link } from "react-router-dom";

export const useInsuranceDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const {
        dataState: insurance,
        errorsState: insuranceErrors,
        setErrors: setInsuranceErrors,
    } = useFetchData({ url: `/insurances/${id}` });

    const handleDelete = async () => {
        if (confirm("Do you want to delete this insurance?")) {
            try {
                await apiDelete(`/insurance/${id}`);
                navigate(`/customers/${insurance.insuredId}`);
            } catch (error) {
                const newErrors = await handleError(error);
                setInsuranceErrors(newErrors);
            }
        }
    };

    return {
        id,
        insurance,
        insuranceErrors,
        handleDelete,
    };
};
