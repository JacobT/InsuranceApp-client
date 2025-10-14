import { useNavigate } from "react-router-dom";

const CustomersTable = ({ customers }) => {
    const navigate = useNavigate();

    return (
        <table className="table table-bordered table-hover table-sm text-center m-0">
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
                        <td>
                            {customer.street}, {customer.city},{" "}
                            {customer.postalCode}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
export default CustomersTable;
