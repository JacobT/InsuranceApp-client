import { useNavigate } from "react-router-dom";

const InsurancesTable = ({ insurances }) => {
    const navigate = useNavigate();

    return (
        <table className="table table-bordered table-hover table-sm text-center m-0">
            <thead>
                <tr>
                    <th className="bg-dark text-light">Insurance name</th>
                    <th className="bg-dark text-light">Subject</th>
                    <th className="bg-dark text-light">Amount</th>
                </tr>
            </thead>
            <tbody>
                {insurances.map((insurance) => (
                    <tr
                        key={insurance.id}
                        onClick={() => navigate(`/insurances/${insurance.id}`)}
                        style={{ cursor: "pointer" }}
                    >
                        <td>{insurance.name}</td>
                        <td>{insurance.subject}</td>
                        <td>{insurance.amount}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
export default InsurancesTable;
