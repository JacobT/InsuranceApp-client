import { Link } from "react-router-dom";
import CustomersTable from "@/components/tables/CustomersTable";
import { useIndex } from "@/hooks/useIndex";
import FilterField from "@/components/FilterField";

const CustomersIndex = () => {
    const { data: customers, handleDelete, setParams } = useIndex("/customers");

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col mb-3">
                        <h1>Customers</h1>
                        <small>Amount of customers: {customers.length}</small>
                    </div>
                    <div className="col-sm-12 col-md-auto d-flex justify-content-center justify-content-md-end jus align-items-center gap-1">
                        <FilterField setParams={setParams} />
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
        </>
    );
};

export default CustomersIndex;
