import { Link } from "react-router-dom";
import { useDetail } from "@/hooks/useDetail";
import { useAuthContext } from "@/contexts/AuthContext";
import { dateStringFormatter } from "@/utils/dateStringFormatter";
import ErrorMessage from "@/components/ErrorMessage";
import ClaimsTable from "@/components/ClaimsTable";
import BackButton from "@/components/BackButton";

const InsuranceDetail = () => {
    const { userState } = useAuthContext();
    const {
        id,
        data: insurance,
        errors: insuranceErrors,
        handleDelete,
    } = useDetail("/insurances");

    return (
        <div>
            {insuranceErrors.general.length > 0 ? (
                <ErrorMessage error={insuranceErrors.general} />
            ) : (
                <>
                    <BackButton url={`/customers/${insurance.insuredId}`} />
                    <div className="container">
                        <div className="row">
                            <div className="col d-flex align-items-center">
                                <h1 className="m-0">{insurance.name}</h1>
                            </div>
                            {userState.roles != "user" &&
                                userState.status === "authenticated" && (
                                    <div className="col col-auto d-flex flex-column align-items-stretch justify-content-center gap-1">
                                        <Link
                                            to={`/insurances/${id}/edit`}
                                            state={{ formData: insurance }}
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
                    <div className="container narrow-container">
                        <div className="row">
                            <div className="col">
                                <h5>Valid from:</h5>
                                <p>
                                    {dateStringFormatter(
                                        insurance.validFrom,
                                        true
                                    )}
                                </p>
                            </div>
                            <div className="col">
                                <h5>Valid to:</h5>
                                <p>
                                    {dateStringFormatter(
                                        insurance.validTo,
                                        true
                                    )}
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <h5>Subject:</h5>
                                <p>{insurance.subject}</p>
                                <h5>Amount:</h5>
                                <p>{insurance.amount}</p>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="container">
                        <div className="row mb-3">
                            <div className="col text-center">
                                <Link
                                    to={"/claims/create"}
                                    state={{
                                        formData: { insuranceId: insurance.id },
                                    }}
                                    className="btn btn-primary"
                                >
                                    Add new claim
                                </Link>
                            </div>
                        </div>
                        {insurance.claims && insurance.claims.length > 0 && (
                            <div className="row">
                                <div className="col">
                                    <ClaimsTable claims={insurance.claims} />
                                </div>
                            </div>
                        )}
                    </div>
                    <hr />
                </>
            )}
        </div>
    );
};

export default InsuranceDetail;
