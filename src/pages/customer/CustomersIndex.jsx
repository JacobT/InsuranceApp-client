import { Link } from "react-router-dom";
import CustomersTable from "../../components/CustomersTable";
import ErrorMessage from "../../components/ErrorMessage";
import { useFetchData } from "../../hooks/useFetchData";

const CustomersIndex = () => {
    const { data: customers, errors: customersErrors } = useFetchData({
        url: "/customers",
    });

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>Customers</h1>
                        <small>Amount of customers: {customers.length}</small>
                    </div>
                    <div className="col col-auto text-end d-flex align-items-center gap-1">
                        <button className="btn btn-primary">
                            Filter (NYI)
                        </button>
                    </div>
                </div>
            </div>
            <hr />
            {customersErrors.general.length > 0 ? (
                <ErrorMessage error={customersErrors.general} />
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
