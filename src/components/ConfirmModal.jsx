const ConfirmModal = ({ options, actions }) => {
    if (!options) return null;

    return (
        <>
            <div className="modal-backdrop fade show"></div>

            <div
                className="modal fade show"
                tabIndex="-1"
                role="dialog"
                style={{ display: "block" }}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{options.title}</h5>
                        </div>
                        {options.message && (
                            <div className="modal-body">{options.message}</div>
                        )}
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={actions.deny}
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={actions.confirm}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConfirmModal;
