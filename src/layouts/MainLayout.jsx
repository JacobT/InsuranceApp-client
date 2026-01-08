import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";

const MainLayout = () => {
    return (
        <div className="d-flex flex-column min-vh-100 bg-body-tertiary">
            <Navbar />

            <main className="flex-fill container py-4">
                <Outlet />
            </main>

            <footer className="bg-dark text-white text-center py-3 mt-auto">
                <small>&copy; {new Date().getFullYear()} InsuranceApp</small>
            </footer>
        </div>
    );
};

export default MainLayout;
