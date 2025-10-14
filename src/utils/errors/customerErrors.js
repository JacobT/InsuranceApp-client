const customerErrors = {
    map: {
        Email: "email",
        FirstName: "firstName",
        LastName: "lastName",
        Phone: "phone",
        Street: "street",
        City: "city",
        PostalCode: "postalCode",
    },

    createEmptyErrorsState: () => ({
        general: [],
        email: [],
        firstName: [],
        lastName: [],
        phone: [],
        street: [],
        city: [],
        postalCode: [],
    }),
};

export default customerErrors;
