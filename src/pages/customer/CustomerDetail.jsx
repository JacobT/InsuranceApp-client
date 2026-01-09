import { Link } from "react-router-dom";
import { useDetail } from "@/hooks/useDetail";
import ErrorMessage from "@/components/ErrorMessage";
import InsurancesTable from "@/components/InsurancesTable";
import BackButton from "../../components/BackButton";
import DetailActionButtons from "../../components/DetailActionButtons";

const CustomerDetail = () => {
    const {
        id,
        data: customer,
        errors: customerErrors,
        handleDelete,
    } = useDetail("/customers");

    return (
        <div>
            {customerErrors.general.length > 0 ? (
                <ErrorMessage error={customerErrors.general} />
            ) : (
                <>
                    <BackButton url={"/customers"} />
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <h1>
                                    {customer.firstName} {customer.lastName}
                                </h1>
                                <small>
                                    Email: {customer.email}
                                    <br />
                                    Phone: {customer.phone}
                                    <br />
                                    Address: {customer.street}, {customer.city},{" "}
                                    {customer.postalCode}
                                </small>
                            </div>
                            <DetailActionButtons
                                editUrl={`/customers/${id}/edit`}
                                formData={customer}
                                handleDelete={handleDelete}
                            />
                        </div>
                    </div>
                    <hr />
                    <div className="container">
                        <div className="row mb-3">
                            <div className="col text-center">
                                <Link
                                    to={"/insurances/create"}
                                    state={{
                                        formData: { insuredId: customer.id },
                                    }}
                                    className="btn btn-primary"
                                >
                                    Add new insurance
                                </Link>
                            </div>
                        </div>
                        {customer.insurances?.length > 0 && (
                            <div className="row">
                                <div className="col">
                                    <InsurancesTable
                                        insurances={customer.insurances}
                                    />
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
export default CustomerDetail;
