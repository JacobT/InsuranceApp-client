import { Link } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";
import { dateStringFormatter } from "../../../utils/dateStringFormatter";
import ErrorMessage from "../../../components/ErrorMessage";
import { useClaimDetail } from "../hooks/useClaimDetail";

const ClaimDetail = () => {
    const { userState } = useAuthContext();
    const { id, claim, claimErrors, handleDelete } = useClaimDetail();

    return (
        <div>
            {claimErrors.general.length > 0 ? (
                <ErrorMessage error={claimErrors.general} />
            ) : (
                <div>
                    <div className="container">
                        <div className="row">
                            <div className="col d-flex align-items-center">
                                <h1 className="m-0">
                                    Insurance claim {claim.id}
                                </h1>
                            </div>
                            {userState.roles != "user" &&
                                userState.status === "authenticated" && (
                                    <div className="col col-auto d-flex flex-column align-items-stretch justify-content-center gap-1">
                                        <Link
                                            to={`/claims/${id}/edit`}
                                            state={{ formData: claim }}
                                            className="btn btn-primary"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            className="btn btn-danger"
                                            onClick={handleDelete}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                        </div>
                    </div>
                    <hr />
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <h5>Description:</h5>
                                <p>{claim.description}</p>
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
                </div>
            )}
        </div>
    );
};

export default ClaimDetail;
