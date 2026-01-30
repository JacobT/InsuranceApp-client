import { Link, useLocation } from "react-router-dom";

const TableActionButtons = ({ editUrl, handleDelete }) => {
    const location = useLocation();
    const currentUrl = location.pathname + location.search + location.hash;

    return (
        <div className="position-absolute end-0 top-50 translate-middle-y table-actions bg-body-secondary">
            <Link
                to={editUrl}
                className="btn btn-sm"
                onClick={(e) => e.stopPropagation()}
                state={{ prevPage: currentUrl }}
            >
                E
            </Link>

            <button
                className="btn btn-sm"
                onClick={(e) => {
                    e.stopPropagation();
                    handleDelete();
                }}
            >
                X
            </button>
        </div>
    );
};

export default TableActionButtons;
