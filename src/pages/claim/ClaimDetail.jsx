import { dateStringFormatter } from "@/utils/dateStringFormatter";
import { useDetail } from "@/hooks/useDetail";
import ErrorMessage from "@/components/ErrorMessage";
import BackButton from "@/components/BackButton";
import DetailActionButtons from "@/components/DetailActionButtons";

const ClaimDetail = () => {
    const {
        id,
        data: claim,
        errors: claimErrors,
        handleDelete,
    } = useDetail("/claims");

    return (
        <div>
            {claimErrors.general.length > 0 ? (
                <ErrorMessage error={claimErrors.general} />
            ) : (
                <>
                    <BackButton url={`/insurances/${claim.insuranceId}`} />
                    <div className="container">
                        <div className="row">
                            <div className="col d-flex align-items-center">
                                <h1 className="m-0">
                                    Insurance claim {claim.id}
                                </h1>
                            </div>
                            <DetailActionButtons
                                editUrl={`/claims/${id}/edit`}
                                formData={claim}
                                handleDelete={handleDelete}
                            />
                        </div>
                    </div>
                    <hr />
                    <div className="container narrow-container">
                        <div className="row">
                            <div className="col">
                                <h5>Description:</h5>
                                <p>{claim.description}</p>
                            </div>
                            <div className="col">
                                <h5>Amount:</h5>
                                <p>{claim.amount}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <h5>Created:</h5>
                                <p>
                                    {dateStringFormatter(claim.createdAt, true)}
                                </p>
                            </div>
                            <div className="col">
                                <h5>Resolved:</h5>
                                <p>
                                    {claim.resolvedAt
                                        ? dateStringFormatter(
                                              claim.resolvedAt,
                                              true
                                          )
                                        : "---"}
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ClaimDetail;
