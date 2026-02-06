import { Link } from "react-router-dom";
import CustomersTable from "@/components/tables/CustomersTable";
import { useIndex } from "@/hooks/useIndex";

const CustomersIndex = () => {
    const { data: customers, handleDelete } = useIndex("/customers");

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
                        <CustomersTable
                            customers={customers}
                            handleDelete={handleDelete}
                        />
                    </div>
                </div>
            </div>

            <hr />
        </div>
    );
};

export default CustomersIndex;
