import { useNavigate } from "react-router-dom";
import { dateStringFormatter } from "@/utils/dateStringFormatter";
import TableActionButtons from "@/components/TableActionButtons";

const ClaimsTable = ({ claims, handleDelete }) => {
    const navigate = useNavigate();

    return (
        <table className="table table-bordered table-hover table-sm text-center align-middle m-0">
            <thead>
                <tr>
                    <th className="bg-dark text-light">Description</th>
                    <th className="bg-dark text-light">Amount</th>
                    <th className="bg-dark text-light">Created</th>
                    <th className="bg-dark text-light">Resolved</th>
                </tr>
            </thead>
            <tbody>
                {claims.map((claim) => (
                    <tr
                        key={claim.id}
                        onClick={() => navigate(`/claims/${claim.id}`)}
                        style={{ cursor: "pointer" }}
                    >
                        <td>{claim.description}</td>
                        <td>{claim.amount}</td>
                        <td>{dateStringFormatter(claim.createdAt, true)}</td>
                        <td className="position-relative">
                            {claim.resolvedAt
                                ? dateStringFormatter(claim.resolvedAt, true)
                                : "---"}
                            <TableActionButtons
                                editUrl={`/claims/${claim.id}/edit`}
                                handleDelete={() =>
                                    handleDelete(`/claims/${claim.id}`)
                                }
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ClaimsTable;
