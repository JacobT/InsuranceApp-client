import { ApiRequestError } from "./apiRequest";
import { IGNORE_ERROR } from "./errors/errorConstants";
import identityErrorsMap from "./errors/identityErrorsMap";

export const createEmptyErrorsState = () => ({ general: [] });

const toCamelCase = (string) =>
    string.charAt(0).toLowerCase() + string.slice(1);

const parseErrors = (response, errors) => {
    // Case 1: Array of { code, description } - identity registration 400 errors
    if (Array.isArray(response)) {
        for (const { code, description } of response) {
            const mapped = identityErrorsMap[code];
            if (mapped === IGNORE_ERROR) {
                continue;
            }
            if (mapped) {
                errors[mapped] = [...[description]];
            } else {
                errors.general.push(description);
            }
        }
    }

    // Case 2: Object with {code: [descriptions]} - domain create and update 400 errors
    if (typeof response === "object") {
        for (const code in response) {
            errors[toCamelCase(code)] = response[code];
        }
    }

    return errors;
};

export const handleError = async (error) => {
    const newErrors = createEmptyErrorsState();

    if (error instanceof ApiRequestError) {
        const { status } = error.response;

        if (status === 400) {
            try {
                const response = await error.response.json();
                return parseErrors(response.errors || response, newErrors);
            } catch (e) {
                console.error("Error while parsing response:", e);
            }
        }

        const message =
            status === 401
                ? "Invalid user information."
                : status === 403
                ? "You're not authorized to do this action."
                : status === 404
                ? "Item not found."
                : "Server error. Please try again later.";

        newErrors.general.push(message);
        return newErrors;
    }

    // Network error (client)
    if (error instanceof TypeError && error.message === "Failed to fetch") {
        newErrors.general.push(
            "Server unreachable. Please check your connection."
        );
        return newErrors;
    }

    // Unknown error
    console.error("Unknown error:", error);
    newErrors.general.push("Unknown error.");
    return newErrors;
};
