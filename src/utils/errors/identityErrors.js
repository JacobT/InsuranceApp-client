import { IGNORE_ERROR } from "./errorConstants";

const identityErrors = {
    map: {
        DuplicateUserName: IGNORE_ERROR,
        DuplicateEmail: "email",
        PasswordTooShort: "password",
        PasswordRequiresDigit: "password",
    },

    createEmptyErrorsState: () => ({
        general: [],
        email: [],
        password: [],
        confirmPassword: [],
    }),
};
export default identityErrors;
