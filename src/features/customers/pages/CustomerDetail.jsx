import { Link } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useCustomerDetail } from "../hooks/useCustomerDetail";
import ErrorMessage from "../../../components/ErrorMessage";
import InsurancesTable from "../../insurances/components/InsurancesTable";

const CustomerDetail = () => {
    const { userState } = useAuthContext();
    const {
        id,
        customer,
        customerErrors,
        insurances,
        insurancesErrors,
        handleDelete,
    } = useCustomerDetail();

    return (
        <div>
            {customerErrors.general.length > 0 ? (
                <ErrorMessage error={customerErrors.general} />
            ) : (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h1>
                                {customer.firstName} {customer.lastName}
                            </h1>
                            <small>
                                Email: {customer.email}, Phone: {customer.phone}
                                <br />
                                Address: {customer.street}, {customer.city},
                                {customer.postalCode}
                            </small>
                        </div>
                        {userState.roles != "user" &&
                            userState.status === "authenticated" && (
                                <div className="col col-auto d-flex flex-column align-items-stretch justify-content-center gap-1">
                                    <Link
                                        to={`/customers/${id}/edit`}
                                        state={{ customerState: customer }}
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
            )}
            <hr />
            {insurancesErrors.general.length > 0 ? (
                <ErrorMessage error={insurancesErrors.general} />
            ) : (
                <div className="container">
                    <div className="row mb-3">
                        <div className="col text-center">
                            <Link
                                to={"/customers/create"}
                                className="btn btn-primary disabled"
                            >
                                Add new insurance
                            </Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <InsurancesTable insurances={insurances} />
                        </div>
                    </div>
                </div>
            )}
            <hr />
        </div>
    );
};
export default CustomerDetail;
