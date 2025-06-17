import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../sidebar";
import Header from "../Header";
import "./style.scss";

const ProtectedLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleSidebarToggle = (collapsed) => {
    setIsSidebarCollapsed(collapsed !== undefined ? collapsed : !isSidebarCollapsed);
  };

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div className={`app-layout `}>
      {isAuthenticated && (
        <>
        <aside className="app-layout__sidebar">
        <Sidebar isCollapsed={isSidebarCollapsed} onToggleCollapse={handleSidebarToggle} />
      </aside>
      </>
       )}
      <main
        className={`app-layout__content ${
          
          isSidebarCollapsed ? "app-layout__content--sidebar-collapsed" : "app-layout__content--sidebar-expanded"
        }`}
      >
         {isAuthenticated && <Header />}
        <div className="app-layout__route-container">
          <Outlet />
        </div>
      </main>
        
     
    </div>
  );
};

export default ProtectedLayout;
