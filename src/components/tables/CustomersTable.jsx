import { useNavigate } from "react-router-dom";
import TableActionButtons from "@/components/TableActionButtons";

const CustomersTable = ({ customers, handleDelete }) => {
    const navigate = useNavigate();

    return (
        <table className="table table-bordered table-hover table-sm text-center align-middle m-0">
            <tbody>
                {customers.map((customer) => (
                    <tr
                        key={customer.id}
                        onClick={() => navigate(`/customers/${customer.id}`)}
                        style={{ cursor: "pointer" }}
                    >
                        <td>
                            {customer.firstName} {customer.lastName}
                        </td>
                        <td>{customer.email}</td>
                        <td className="position-relative">
                            {customer.street}, {customer.city},{" "}
                            {customer.postalCode}
                            <TableActionButtons
                                editUrl={`/customers/${customer.id}/edit`}
                                handleDelete={() =>
                                    handleDelete(`/customers/${customer.id}`)
                                }
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
export default CustomersTable;
