const REFRESH_KEY = "refreshToken";

export const getRefreshToken = () => localStorage.getItem(REFRESH_KEY);

export const saveRefreshToken = (refreshToken) => {
    localStorage.setItem(REFRESH_KEY, refreshToken);
};

export const clearRefreshToken = () => {
    localStorage.removeItem(REFRESH_KEY);
};

export const decodeJwt = (token) => {
    try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        return JSON.parse(atob(base64));
    } catch (e) {
        console.error("Invalid JWT", e);
        return null;
    }
};
