import { useState, useEffect } from "react";
import {
    getRefreshToken,
    saveRefreshToken,
    clearRefreshToken,
    decodeJwt,
} from "@/utils/tokens";
import {
    registerService,
    loginService,
    refreshService,
    logoutService,
} from "@/services/authService";
import { ApiRequestError } from "@/utils/apiRequest";

const USER_ROLES =
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
const ACCESS_TOKEN_KEY = "jwtToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export const useAuth = () => {
    const createEmptyUser = (status = "unauthenticated") => ({
        email: "",
        roles: "",
        status,
    });

    const createEmptyAccessToken = () => ({
        token: "",
        expiration: 0,
    });

    const [user, setUser] = useState(createEmptyUser("loading"));
    const [accessToken, setAccessToken] = useState(createEmptyAccessToken());

    useEffect(() => {
        const getUser = async () => {
            await refresh();
        };
        getUser();
    }, []);

    const saveTokens = (newTokens) => {
        saveRefreshToken(newTokens[REFRESH_TOKEN_KEY]);

        const userClaims = decodeJwt(newTokens[ACCESS_TOKEN_KEY]);
        setUser({
            email: userClaims.email,
            roles: Array.isArray(userClaims[USER_ROLES])
                ? userClaims[USER_ROLES].join(" ")
                : userClaims[USER_ROLES],
            status: "authenticated",
        });

        setAccessToken({
            token: newTokens[ACCESS_TOKEN_KEY],
            expiration: userClaims.exp,
        });

        return newTokens[ACCESS_TOKEN_KEY];
    };

    const isAccessTokenExpired = () => {
        return Date.now() >= accessToken.expiration * 1000 - 30000;
    };

    const getAccessToken = async () => {
        if (!accessToken.token || isAccessTokenExpired()) {
            return await refresh();
        }

        return accessToken.token;
    };

    const login = async (payload) => {
        const response = await loginService(payload);
        const tokens = await response.json();
        saveTokens(tokens);
    };

    const register = async (payload) => {
        await registerService(payload);
        await login(payload);
    };

    let refreshPromise;
    const refresh = async () => {
        if (refreshPromise) {
            return refreshPromise;
        }

        const refreshToken = getRefreshToken();
        if (!refreshToken) {
            setUser(createEmptyUser());
            return null;
        }

        refreshPromise = (async () => {
            try {
                const response = await refreshService({
                    refreshToken,
                });
                const newTokens = await response.json();
                const token = saveTokens(newTokens);
                return token;
            } catch (error) {
                if (
                    error instanceof ApiRequestError &&
                    error.response.status === 401
                ) {
                    clearRefreshToken();
                    return null;
                }

                setAccessToken(createEmptyAccessToken());
                setUser(createEmptyUser());
                throw error;
            } finally {
                refreshPromise = null;
            }
        })();

        return refreshPromise;
    };

    const logout = async () => {
        const token = await getAccessToken();
        await logoutService(token);
        clearRefreshToken();
        setAccessToken(createEmptyAccessToken());
        setUser(createEmptyUser());
    };

    return { userState: user, register, login, logout, getAccessToken };
};
