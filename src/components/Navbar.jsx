import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";

const Navbar = () => {
    const { userState, logout } = useAuthContext();
    const [isOpen, setIsOpen] = useState(false);
    const route = useLocation().pathname;

    const handleClick = () => {
        setIsOpen(false);
    };

    return (
        <div className="container-fluid bg-dark">
            <div className="">
                <nav className="navbar navbar-expand-md navbar-dark text-nowrap">
                    <strong className="navbar-brand">InsuranceApp</strong>

                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div
                        className={`collapse navbar-collapse ${
                            isOpen ? "show" : ""
                        }`}
                        id="nav-content"
                    >
                        <ul className="navbar-nav me-auto ms-3">
                            <li className="nav-item">
                                <Link
                                    to={"/"}
                                    className={`nav-link ${
                                        route === "/" ? "active" : ""
                                    }`}
                                    onClick={handleClick}
                                >
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    to={"/customers"}
                                    className={`nav-link 
                                    ${route === "/customers" ? "active" : ""} 
                                    ${
                                        userState.status === "authenticated"
                                            ? ""
                                            : "disabled"
                                    }`}
                                    onClick={handleClick}
                                >
                                    Customers
                                </Link>
                            </li>
                        </ul>
                        {userState.status === "unauthenticated" && (
                            <ul className="navbar-nav ms-md-auto me-3 ms-3">
                                <li className="nav-item">
                                    <Link
                                        to={"/register"}
                                        className={`nav-link ${
                                            route === "/register"
                                                ? "active"
                                                : ""
                                        }`}
                                        onClick={handleClick}
                                    >
                                        Register
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        to={"/login"}
                                        className={`nav-link ${
                                            route === "/login" ? "active" : ""
                                        }`}
                                        onClick={handleClick}
                                    >
                                        Login
                                    </Link>
                                </li>
                            </ul>
                        )}
                        {userState.status === "authenticated" && (
                            <ul className="navbar-nav ms-md-auto me-3 ms-3">
                                <li className="nav-item nav-link disabled">
                                    {userState.email}
                                </li>
                                <li className="nav-item" onClick={logout}>
                                    <button className="nav-link btn btn-link">
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        )}
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;
