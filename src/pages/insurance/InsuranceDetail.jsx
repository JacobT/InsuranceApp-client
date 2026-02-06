import { Link, useNavigate } from "react-router-dom";
import { useDetail } from "@/hooks/useDetail";
import { dateStringFormatter } from "@/utils/dateStringFormatter";
import ClaimsTable from "@/components/tables/ClaimsTable";
import BackButton from "@/components/navigation/BackButton";
import DetailActionButtons from "@/components/DetailActionButtons";

const InsuranceDetail = () => {
    const navigate = useNavigate();
    const { data: insurance, handleDelete, refresh } = useDetail("/insurances");

    return (
        <>
            <BackButton url={`/customers/${insurance.insuredId}`} />
            <div className="container">
                <div className="row">
                    <div className="col d-flex align-items-center">
                        <h1 className="m-0">{insurance.name}</h1>
                    </div>
                    <DetailActionButtons
                        editUrl={`/insurances/${insurance.id}/edit`}
                        handleDelete={() =>
                            handleDelete({
                                url: `/insurances/${insurance.id}`,
                                callBack: navigate(
                                    `/customers/${insurance.insuredId}`,
                                ),
                            })
                        }
                    />
                </div>
            </div>
            <hr />
            <div className="container narrow-container">
                <div className="row">
                    <div className="col">
                        <h5>Valid from:</h5>
                        <p>{dateStringFormatter(insurance.validFrom, true)}</p>
                    </div>
                    <div className="col">
                        <h5>Valid to:</h5>
                        <p>{dateStringFormatter(insurance.validTo, true)}</p>
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
                            <ClaimsTable
                                claims={insurance.claims}
                                handleDelete={(url) =>
                                    handleDelete({
                                        url,
                                        callBack: refresh,
                                    })
                                }
                            />
                        </div>
                    </div>
                )}
            </div>
            <hr />
        </>
    );
};

export default InsuranceDetail;
