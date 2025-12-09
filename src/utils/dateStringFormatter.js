export const dateStringFormatter = (dateString, locale = false) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    if (locale) {
        return date.toLocaleDateString("cs-CZ");
    }

    return date.toISOString().split("T")[0];
};
