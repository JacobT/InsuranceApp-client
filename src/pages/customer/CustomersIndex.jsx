import { Link } from "react-router-dom";
import CustomersTable from "@/components/tables/CustomersTable";
import { useIndex } from "@/hooks/useIndex";
import FilterField from "@/components/tables/FilterField";

const CustomersIndex = () => {
    const { data: customers, handleDelete, setParams } = useIndex("/customers");

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>Customers</h1>
                        <small>Amount of customers: {customers.length}</small>
                    </div>
                    <div className="col col-auto text-end d-flex align-items-center gap-1">
                        <Link
                            to={"/customers/create"}
                            className="btn btn-primary"
                        >
                            Create new customer
                        </Link>
                    </div>
                </div>
            </div>
            <hr />
            <div className="container">
                <div className="row mb-3 ">
                    <div className="col">
                        <FilterField setParams={setParams} />
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
