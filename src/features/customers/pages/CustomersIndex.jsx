import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useApi } from "../../../hooks/useApi";
import CustomersTable from "../components/CustomersTable";
import { handleError } from "../../../utils/handleError";
import ErrorMessage from "../../../components/ErrorMessage";

const CustomersIndex = () => {
    const { apiGet } = useApi();
    const [customers, setCustomers] = useState([]);
    const [errors, setErrors] = useState({ general: [] });

    useEffect(() => {
        const getCustomers = async () => {
            try {
                const response = await apiGet("/customers");
                if (response) {
                    const customers = await response.json();
                    setCustomers(customers);
                }
            } catch (error) {
                const newErrors = await handleError(error);
                setErrors(newErrors);
            }
        };
        getCustomers();
    }, []);

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>Customers</h1>
                        <small>Amount of customers: {customers.length}</small>
                    </div>
                    <div className="col col-auto text-end d-flex align-items-center gap-1">
                        <button className="btn btn-primary">Filter</button>
                    </div>
                </div>
            </div>
            <hr />
            {errors.general.length > 0 ? (
                <ErrorMessage error={errors.general} />
            ) : (
                <div className="container">
                    <div className="row mb-3">
                        <div className="col text-center">
                            <Link
                                to={"/customers/create"}
                                className="btn btn-primary"
                            >
                                Create new customer
                            </Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <CustomersTable customers={customers} />
                        </div>
                    </div>
                </div>
            )}
            <hr />
        </div>
    );
};

export default CustomersIndex;
