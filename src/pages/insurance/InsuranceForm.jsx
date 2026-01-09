import { useForm } from "@/hooks/useForm";
import { dateStringFormatter } from "@/utils/dateStringFormatter";
import InputField from "@/components/InputField";
import ErrorMessage from "@/components/ErrorMessage";
import BackButton from "@/components/BackButton";

const InsuranceForm = () => {
    const {
        mode,
        data: insurance,
        errors: insuranceErrors,
        handleChange,
        handleSubmit,
    } = useForm("/Insurances");

    return (
        <>
            <BackButton
                url={
                    insurance.id
                        ? `/insurances/${insurance.id}`
                        : `/customers/${insurance.insuredId}`
                }
            />
            <h1 className="mx-2">
                {mode === "create" ? "Create" : "Edit"} insurance:
            </h1>
            <hr />
            {insuranceErrors.general.length > 0 && (
                <ErrorMessage error={insuranceErrors.general} />
            )}

            <form
                className="container narrow-container"
                onSubmit={handleSubmit}
            >
                <div className="row">
                    <div className="col-6">
                        <InputField
                            required={true}
                            label={"Insurance type:"}
                            type={"text"}
                            name={"name"}
                            placeholder={"Type of insurance"}
                            value={insurance.name || ""}
                            handleChange={handleChange}
                            error={insuranceErrors.name}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <InputField
                            required={true}
                            label={"Subject:"}
                            type={"text"}
                            name={"subject"}
                            placeholder={"Subject of insurance"}
                            value={insurance.subject || ""}
                            handleChange={handleChange}
                            error={insuranceErrors.subject}
                        />

                        <InputField
                            required={true}
                            label={"Valid from:"}
                            type={"date"}
                            name={"validFrom"}
                            placeholder={"Začátek pojištění"}
                            value={
                                dateStringFormatter(insurance.validFrom) || ""
                            }
                            handleChange={handleChange}
                            error={insuranceErrors.validFrom}
                        />
                    </div>
                    <div className="col">
                        <InputField
                            required={true}
                            label={"Amount:"}
                            type={"number"}
                            name={"amount"}
                            placeholder={"Insured amount"}
                            value={insurance.amount || ""}
                            handleChange={handleChange}
                            error={insuranceErrors.amount}
                        />

                        <InputField
                            required={true}
                            label={"Valid to:"}
                            type={"date"}
                            name={"validTo"}
                            value={dateStringFormatter(insurance.validTo) || ""}
                            handleChange={handleChange}
                            error={insuranceErrors.validTo}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col text-end mt-4">
                        <input
                            type="submit"
                            className="btn btn-primary"
                            value={"Save"}
                        />
                    </div>
                </div>
            </form>
        </>
    );
};

export default InsuranceForm;
