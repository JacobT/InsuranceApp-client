import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import AuthenticationForm from "./pages/AuthenticationForm";
import CustomersIndex from "./features/customers/pages/CustomersIndex";
import CustomerDetail from "./features/customers/pages/CustomerDetail";
import CustomerForm from "./features/customers/pages/CustomerForm";

function App() {
    return (
        <Router>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/customers" element={<CustomersIndex />} />
                    <Route path="/customers/:id" element={<CustomerDetail />} />
                    <Route
                        path="/customers/create"
                        element={<CustomerForm mode={"create"} />}
                    />
                    <Route
                        path="/customers/:id/edit"
                        element={<CustomerForm mode={"edit"} />}
                    />

                    <Route
                        path="/register"
                        element={<AuthenticationForm mode={"register"} />}
                    />
                    <Route
                        path="/login"
                        element={<AuthenticationForm mode={"login"} />}
                    />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
