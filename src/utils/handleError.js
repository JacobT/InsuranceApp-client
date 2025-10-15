import { ApiRequestError } from "./apiRequest";
import { IGNORE_ERROR } from "./errors/errorConstants";

const parseErrors = (response, map, newErrors) => {
    // Case 1: Array of { code, description } - identity registration 400 errors
    if (Array.isArray(response)) {
        for (const { code, description } of response) {
            sortErrors(newErrors, code, description, map);
        }

        // Case 2: Object with {code: [descriptions]} - domain create and update 400 errors
    } else if (typeof response === "object") {
        for (const code in response) {
            for (const description of response[code]) {
                sortErrors(newErrors, code, description, map);
            }
        }
    }
    return newErrors;
};

const sortErrors = (errors, code, description, errorMap) => {
    const field = errorMap[code];
    if (field === IGNORE_ERROR) {
        return errors;
    }
    if (field) {
        errors[field].push(description);
    } else {
        errors.general.push(description);
    }
    return errors;
};

const defaultErrorConfig = {
    map: {},
    createEmptyErrorsState: () => ({ general: [] }),
};

export const handleError = async (error, errorConfig) => {
    const { map, createEmptyErrorsState } = errorConfig ?? defaultErrorConfig;
    const newErrors = createEmptyErrorsState();

    if (error instanceof ApiRequestError) {
        switch (error.response.status) {
            case 400:
                try {
                    const response = await error.response.json();
                    return parseErrors(
                        response.errors || response,
                        map,
                        newErrors
                    );
                } catch (e) {
                    console.error("Error while parsing response:", e);
                }
                break;

            case 401:
                newErrors.general.push("Invalid user information.");
                return newErrors;

            case 403:
                newErrors.general.push(
                    "You're not authorized to do this action."
                );
                return newErrors;

            case 404:
                newErrors.general.push("Item not found.");
                return newErrors;

            default:
                newErrors.general.push("Server error. Please try again later.");
                return newErrors;
        }
    }

    if (error instanceof TypeError && error.message === "Failed to fetch") {
        newErrors.general.push(
            "Server unreachable. Please check your connection."
        );
        return newErrors;
    }

    console.error("Unknown error:", error);
    newErrors.general.push("Unknown error.");
    return newErrors;
};
