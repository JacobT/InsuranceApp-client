import { Link } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useCustomerDetail } from "../hooks/useCustomerDetail";
import ErrorMessage from "../../../components/ErrorMessage";

const CustomerDetail = () => {
    const { userState } = useAuthContext();
    const { id, customer, errors, handleDelete } = useCustomerDetail();

    return (
        <div>
            {errors.general.length > 0 ? (
                <ErrorMessage error={errors.general} />
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
        </div>
    );
};
export default CustomerDetail;
