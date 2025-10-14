import { apiRequest } from "../utils/apiRequest";

export const registerService = async (payload) => {
    const body = JSON.stringify(payload);
    return apiRequest("/auth/register", { method: "POST", body });
};

export const loginService = async (payload) => {
    const body = JSON.stringify(payload);
    return await apiRequest("/auth/login", { method: "POST", body });
};

export const refreshService = async (payload) => {
    const body = JSON.stringify(payload);
    return await apiRequest("/auth/refresh", { method: "POST", body });
};

export const logoutService = async (token) => {
    await apiRequest("/auth/logout", { method: "DELETE", token });
};
