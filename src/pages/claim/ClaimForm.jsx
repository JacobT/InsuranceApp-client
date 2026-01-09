import { useForm } from "@/hooks/useForm";
import { dateStringFormatter } from "@/utils/dateStringFormatter";
import ErrorMessage from "@/components/ErrorMessage";
import InputField from "@/components/InputField";
import BackButton from "@/components/BackButton";

const ClaimForm = () => {
    const {
        mode,
        data: claim,
        errors: claimErrors,
        handleChange,
        handleSubmit,
    } = useForm("/claims");

    return (
        <>
            <BackButton
                url={
                    claim.id
                        ? `/claims/${claim.id}`
                        : `/insurances/${claim.insuranceId}`
                }
            />
            <h1 className="mx-2">
                {mode === "create" ? "Create" : "Edit"} claim:
            </h1>
            <hr />
            {claimErrors.general.length > 0 && (
                <ErrorMessage error={claimErrors.general} />
            )}

            <form
                className="container narrow-container"
                onSubmit={handleSubmit}
            >
                <div className="row">
                    <div className="col-6">
                        <InputField
                            required={true}
                            name={"description"}
                            label={"Description:"}
                            type={"text"}
                            handleChange={handleChange}
                            value={claim.description || ""}
                            error={claimErrors.description}
                        />
                    </div>
                    <div className="col-6">
                        <div>
                            <InputField
                                required={true}
                                name={"amount"}
                                label={"Amount:"}
                                type={"text"}
                                handleChange={handleChange}
                                value={claim.amount || ""}
                                error={claimErrors.amount}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <InputField
                            required={true}
                            label={"Created:"}
                            type={"date"}
                            name={"createdAt"}
                            value={dateStringFormatter(claim.createdAt) || ""}
                            handleChange={handleChange}
                            error={claimErrors.createdAt}
                        />
                    </div>
                    <div className="col-6">
                        <div>
                            <InputField
                                label={"Resolved:"}
                                type={"date"}
                                name={"resolvedAt"}
                                value={
                                    dateStringFormatter(claim.resolvedAt) || ""
                                }
                                handleChange={handleChange}
                                error={claimErrors.resolvedAt}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col text-end">
                        <input
                            type="submit"
                            className="btn btn-primary my-3"
                            value={"Save"}
                        />
                    </div>
                </div>
            </form>
        </>
    );
};
export default ClaimForm;
