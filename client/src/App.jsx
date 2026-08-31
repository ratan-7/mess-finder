import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import PublicApp from "./PublicApp";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import NotFound from "./components/NotFound";
import OwnerDashboard from "./owner/ownerDashboard";

function RequireAdmin({ children }) {
  const token = localStorage.getItem("adminToken");
  return token ? children : <Navigate to="/admin" replace />;
}

function RequireOwner({ children }) {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  return user?.role === "mess_owner" ? children : <Navigate to="/" replace />;
}

export default function App() {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicApp />} />
          <Route path="/admin" element={<AdminLogin />} />

          <Route
            path="/admin/dashboard"
            element={
              <RequireAdmin>
                <AdminDashboard />
              </RequireAdmin>
            }
          />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/owner/dashboard"
            element={
              <RequireOwner>
                <OwnerDashboard />
              </RequireOwner>
            }
          />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}
