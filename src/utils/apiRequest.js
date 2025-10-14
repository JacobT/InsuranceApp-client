const API_URL = "http://localhost:5236/api";

export class ApiRequestError extends Error {
    constructor(response) {
        super(
            `There was error when fetching data ${response.status} - ${response.statusText}`
        );
        this.response = response;
    }
}

export const apiRequest = async (url, { method = "GET", body, token } = {}) => {
    const headers = { "Content-Type": "application/json" };
    if (token) {
        headers.authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${url}`, {
        method,
        headers,
        body,
    });

    if (!response.ok) {
        if (
            response.status === 400 ||
            response.status === 401 ||
            response.status === 403 ||
            response.status === 404 ||
            response.status >= 500
        )
            throw new ApiRequestError(response);
    }

    return response;
};
