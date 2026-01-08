import { useAuthContext } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { apiRequest, ApiRequestError } from "@/utils/apiRequest";

export const useApi = () => {
    const navigate = useNavigate();
    const { getAccessToken } = useAuthContext();

    const apiMethod = async (method, url, data = null) => {
        try {
            const body = data ? JSON.stringify(data) : undefined;
            const token = await getAccessToken();
            return await apiRequest(url, { method, body, token });
        } catch (error) {
            if (
                error instanceof ApiRequestError &&
                error.response.status === 401
            ) {
                navigate("/login", { replace: true });
                return null;
            }
            throw error;
        }
    };

    return {
        apiGet: async (url) => await apiMethod("GET", url),
        apiPost: (url, data) => apiMethod("POST", url, data),
        apiPut: (url, data) => apiMethod("PUT", url, data),
        apiDelete: (url) => apiMethod("DELETE", url),
    };
};
