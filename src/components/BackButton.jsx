import { Link } from "react-router-dom";

const BackButton = ({ url }) => {
    return (
        <Link to={url} className="btn btn-secondary my-3">
            &lsaquo; Back
        </Link>
    );
};

export default BackButton;
