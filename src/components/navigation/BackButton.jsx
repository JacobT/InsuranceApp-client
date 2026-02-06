import { Link, useLocation } from "react-router-dom";

const BackButton = ({ url }) => {
    const stateUrl = useLocation().state?.prevPage;

    return (
        <Link to={stateUrl ? stateUrl : url} className="btn btn-secondary my-3">
            &lsaquo; Back
        </Link>
    );
};

export default BackButton;
