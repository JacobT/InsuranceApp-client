import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useApi } from "../../../hooks/useApi";
import { useAuthContext } from "../../../contexts/AuthContext";
import ErrorMessage from "../../../components/ErrorMessage";
import { handleError } from "../../../utils/handleError";

const CustomerDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { apiGet, apiDelete } = useApi();
    const { userState } = useAuthContext();
    const [customer, setCustomer] = useState([]);
    const [errors, setErrors] = useState({ general: [] });

    useEffect(() => {
        const getCustomerDetail = async () => {
            try {
                const response = await apiGet(`/customers/${id}`);
                if (response) {
                    const customer = await response.json();
                    setCustomer(customer);
                }
            } catch (error) {
                const newErrors = await handleError(error);
                setErrors(newErrors);
            }
        };
        getCustomerDetail();
    }, []);

    const handleDelete = async () => {
        if (confirm("Do you want to delete this customer?")) {
            try {
                await apiDelete(`/customers/${id}`);
                navigate("/customers");
            } catch (error) {
                const newErrors = await handleError(error);
                alert(newErrors.general);
            }
        }
    };

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
