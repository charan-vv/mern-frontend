// src/layout/PublicLayout.jsx
import { Outlet, Navigate } from "react-router-dom";
import "./style.scss";

const PublicLayout = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <div className="app-layout app-layout--public">
      <main className="app-layout__content app-layout__content--full-width">
        {!isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" replace />}
      </main>
    </div>
  );
};

export default PublicLayout;
