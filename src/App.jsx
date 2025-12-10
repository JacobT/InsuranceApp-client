import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import AuthenticationForm from "./pages/AuthenticationForm";
import CustomersIndex from "./features/customers/pages/CustomersIndex";
import CustomerDetail from "./features/customers/pages/CustomerDetail";
import CustomerForm from "./features/customers/pages/CustomerForm";
import InsuranceDetail from "./features/insurances/pages/InsuranceDetail";
import InsuranceForm from "./features/insurances/pages/InsuranceForm.jsx";
import ClaimDetail from "./features/claims/pages/ClaimDetail.jsx";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/customers">
                        <Route index element={<CustomersIndex />} />
                        <Route path=":id" element={<CustomerDetail />} />
                        <Route path="create" element={<CustomerForm />} />
                        <Route path=":id/edit" element={<CustomerForm />} />
                    </Route>

                    <Route path="/insurances">
                        <Route path=":id" element={<InsuranceDetail />} />
                        <Route path="create" element={<InsuranceForm />} />
                        <Route path=":id/edit" element={<InsuranceForm />} />
                    </Route>

                    <Route path="/claims">
                        <Route path=":id" element={<ClaimDetail />} />
                        {/* <Route path="create" element={<ClaimForm />} />
                        <Route path=":id/edit" element={<ClaimForm />} /> */}
                    </Route>

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
};

export default App;
