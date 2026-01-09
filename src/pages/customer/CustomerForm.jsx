import { useForm } from "@/hooks/useForm";
import ErrorMessage from "@/components/ErrorMessage";
import InputField from "@/components/InputField";
import BackButton from "../../components/BackButton";

const CustomerForm = () => {
    const {
        mode,
        data: customer,
        errors: customerErrors,
        handleChange,
        handleSubmit,
    } = useForm("/customers");

    return (
        <>
            <BackButton
                url={customer.id ? `/customers/${customer.id}` : "/customers"}
            />
            <h1 className="mx-2">
                {mode === "create" ? "Create" : "Edit"} customer:
            </h1>
            <hr />
            {customerErrors.general.length > 0 && (
                <ErrorMessage error={customerErrors.general} />
            )}

            <form
                className="container narrow-container"
                onSubmit={handleSubmit}
            >
                <div className="row">
                    <div className="col-6">
                        <InputField
                            required={true}
                            name={"firstName"}
                            label={"First name:"}
                            type={"text"}
                            handleChange={handleChange}
                            value={customer.firstName || ""}
                            error={customerErrors.firstName}
                        />

                        <InputField
                            required={true}
                            name={"lastName"}
                            label={"Last name:"}
                            type={"text"}
                            handleChange={handleChange}
                            value={customer.lastName || ""}
                            error={customerErrors.lastName}
                        />

                        <InputField
                            required={true}
                            name={"email"}
                            label={"Email:"}
                            type={"email"}
                            handleChange={handleChange}
                            value={customer.email || ""}
                            error={customerErrors.email}
                        />

                        <InputField
                            required={true}
                            name={"phone"}
                            label={"Phone number:"}
                            type={"text"}
                            handleChange={handleChange}
                            value={customer.phone || ""}
                            error={customerErrors.phone}
                        />
                    </div>
                    <div className="col-6 d-flex flex-column justify-content-between">
                        <div>
                            <InputField
                                required={true}
                                name={"street"}
                                label={"Street:"}
                                type={"text"}
                                handleChange={handleChange}
                                value={customer.street || ""}
                                error={customerErrors.street}
                            />
                            <InputField
                                required={true}
                                name={"city"}
                                label={"City:"}
                                type={"text"}
                                handleChange={handleChange}
                                value={customer.city || ""}
                                error={customerErrors.city}
                            />
                            <InputField
                                required={true}
                                name={"postalCode"}
                                label={"Postal Code:"}
                                type={"text"}
                                handleChange={handleChange}
                                value={customer.postalCode || ""}
                                error={customerErrors.postalCode}
                            />
                        </div>
                        <div className="d-flex justify-content-end">
                            <input
                                type="submit"
                                className="btn btn-primary"
                                value={"Save"}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};
export default CustomerForm;
