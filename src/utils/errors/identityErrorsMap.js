import { IGNORE_ERROR } from "@/utils/errors/errorConstants";

const identityErrorsMap = {
    DuplicateUserName: IGNORE_ERROR,
    DuplicateEmail: "email",
    PasswordTooShort: "password",
    PasswordRequiresDigit: "password",
};

export default identityErrorsMap;
