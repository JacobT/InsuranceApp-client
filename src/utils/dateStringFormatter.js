export const dateStringFormatter = (dateString, locale = false) => {
    if (!dateString) return "";

    const date = dateString.split("T")[0];

    if (locale) {
        return new Date(date).toLocaleDateString("cs-CZ");
    }

    return date;
};
