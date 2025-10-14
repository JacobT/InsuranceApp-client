import { useCustomerForm } from "../hooks/useCustomerForm";
import ErrorMessage from "../../../components/ErrorMessage";
import InputField from "../../../components/InputField";

const CustomerForm = ({ mode }) => {
    const { customerState, errorsState, handleChange, handleSubmit } =
        useCustomerForm(mode);

    return (
        <>
            <h1 className="mx-2">
                {mode === "create" ? "Create customer:" : "Edit customer:"}
            </h1>
            <hr />
            {errorsState.general.length > 0 && (
                <ErrorMessage error={errorsState.general} />
            )}

            <form className="container" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-6">
                        <InputField
                            required={true}
                            name={"firstName"}
                            label={"First name:"}
                            type={"text"}
                            handleChange={handleChange}
                            value={customerState.firstName}
                            error={errorsState.firstName}
                        />

                        <InputField
                            required={true}
                            name={"lastName"}
                            label={"Last name:"}
                            type={"text"}
                            handleChange={handleChange}
                            value={customerState.lastName}
                            error={errorsState.lastName}
                        />

                        <InputField
                            required={true}
                            name={"email"}
                            label={"Email:"}
                            type={"email"}
                            handleChange={handleChange}
                            value={customerState.email}
                            error={errorsState.email}
                        />

                        <InputField
                            required={true}
                            name={"phone"}
                            label={"Phone number:"}
                            type={"text"}
                            handleChange={handleChange}
                            value={customerState.phone}
                            error={errorsState.phone}
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
                                value={customerState.street}
                                error={errorsState.street}
                            />
                            <InputField
                                required={true}
                                name={"city"}
                                label={"City:"}
                                type={"text"}
                                handleChange={handleChange}
                                value={customerState.city}
                                error={errorsState.city}
                            />
                            <InputField
                                required={true}
                                name={"postalCode"}
                                label={"Postal Code:"}
                                type={"text"}
                                handleChange={handleChange}
                                value={customerState.postalCode}
                                error={errorsState.postalCode}
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
