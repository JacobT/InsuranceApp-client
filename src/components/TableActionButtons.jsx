import { Link, useLocation } from "react-router-dom";
import { PencilSquare, TrashFill } from "react-bootstrap-icons";

const TableActionButtons = ({ editUrl, handleDelete }) => {
    const location = useLocation();
    const currentUrl = location.pathname + location.search + location.hash;

    return (
        <div className="position-absolute end-0 top-50 translate-middle-y table-actions">
            <Link
                to={editUrl}
                className="btn btn-sm"
                onClick={(e) => e.stopPropagation()}
                state={{ prevPage: currentUrl }}
            >
                <PencilSquare
                    className="d-flex justify-content-center align-content-center"
                    size={23}
                />
            </Link>

            <button
                className="btn btn-sm"
                onClick={(e) => {
                    e.stopPropagation();
                    handleDelete();
                }}
            >
                <TrashFill
                    className="d-flex justify-content-center align-content-center"
                    size={23}
                />
            </button>
        </div>
    );
};

export default TableActionButtons;
