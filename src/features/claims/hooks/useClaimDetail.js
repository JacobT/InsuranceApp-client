import { useNavigate, useParams } from "react-router-dom";
import { useFetchData } from "../../../hooks/useFetchData";
import { handleError } from "../../../utils/handleError";
import { useApi } from "../../../hooks/useApi";

export const useClaimDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { apiDelete } = useApi();

    const {
        data: claim,
        errors: claimErrors,
        setErrors: setClaimErrors,
    } = useFetchData({ url: `/claims/${id}` });

    const handleDelete = async () => {
        if (confirm("Do you want to delete this claim?")) {
            try {
                await apiDelete(`/claims/${id}`);
                navigate(`/claims/${claim.insuranceId}`);
            } catch (error) {
                const newErrors = await handleError(error);
                setClaimErrors(newErrors);
            }
        }
    };

    return {
        id,
        claim,
        claimErrors,
        handleDelete,
    };
};
