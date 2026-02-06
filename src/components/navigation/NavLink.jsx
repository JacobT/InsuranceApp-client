import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "@/contexts/AuthContext";
import { AUTH_STATUS } from "@/utils/constants";

const NavLink = (to, value, handleClick = () => {}) => {
    const route = useLocation().pathname;
    const userState = useAuthContext().userState;

    return (
        <Link
            to={to}
            className={`
                nav-link 
                ${route === to ? "active" : ""} 
                ${userState.status === AUTH_STATUS.AUTHENTICATED ? "" : "disabled"}
            `}
            onClick={handleClick}
        >
            {value}
        </Link>
    );
};
export default NavLink;
