import { useNavigate } from "react-router-dom";
import TableActionButtons from "@/components/TableActionButtons";

const InsurancesTable = ({ insurances, handleDelete }) => {
    const navigate = useNavigate();

    return (
        <table className="table table-bordered table-hover table-sm text-center align-middle m-0">
            <thead>
                <tr>
                    <th className="bg-dark text-light">Insurance name</th>
                    <th className="bg-dark text-light">Subject</th>
                    <th className="bg-dark text-light">Amount</th>
                </tr>
            </thead>
            <tbody>
                {insurances &&
                    insurances.map((insurance) => (
                        <tr
                            key={insurance.id}
                            onClick={() =>
                                navigate(`/insurances/${insurance.id}`)
                            }
                            style={{ cursor: "pointer" }}
                        >
                            <td>{insurance.name}</td>
                            <td>{insurance.subject}</td>
                            <td className="position-relative">
                                {insurance.amount}
                                <TableActionButtons
                                    editUrl={`/insurances/${insurance.id}/edit`}
                                    handleDelete={() =>
                                        handleDelete(
                                            `/insurances/${insurance.id}`,
                                        )
                                    }
                                />
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>
    );
};
export default InsurancesTable;
