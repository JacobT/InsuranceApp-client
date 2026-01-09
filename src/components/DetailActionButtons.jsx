import useAuthContext from "@/contexts/AuthContext";

const DetailActionButtons = ({ editUrl, formData, handleDelete }) => {
    const { userState } = useAuthContext();

    return (
        <>
            {!userState.roles.includes("user") &&
                userState.status === "authenticated" && (
                    <div className="col col-auto d-flex flex-column align-items-stretch justify-content-center gap-1">
                        <Link
                            to={editUrl}
                            state={{ formData: formData }}
                            className="btn btn-primary"
                        >
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
