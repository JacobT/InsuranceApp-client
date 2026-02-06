import { Link } from "react-router-dom";
import { useAuthContext } from "@/contexts/AuthContext";
import { AUTH_STATUS } from "@/utils/constants";

const DetailActionButtons = ({ editUrl, handleDelete }) => {
    const { userState } = useAuthContext();

    return (
        <>
            {!userState.roles.includes("user") &&
                userState.status === AUTH_STATUS.AUTHENTICATED && (
                    <div className="col col-auto d-flex flex-column align-items-stretch justify-content-center gap-1">
                        <Link to={editUrl} className="btn btn-warning">
                            Edit
                        </Link>

                        <button
                            className="btn btn-danger"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                    </div>
                )}
        </>
    );
};

export default DetailActionButtons;
