import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Sidebar from "../sidebar";
import Header from "../Header";
import "./style.scss";
import getTourSteps from "src/utils/Tour";
import { Tour } from "src/components";

const ProtectedLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));


 const [open, setOpen] = useState(false);
  const refs = useRef({});
  const setRef = (key) => (el) => {
    if (el) refs.current[key] = el;
  };
  const steps = getTourSteps(refs);

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
        <Sidebar side_bar_ref={setRef("sidebar")} isCollapsed={isSidebarCollapsed} onToggleCollapse={handleSidebarToggle} />
      </aside>
      </>
       )}
      <main
        className={`app-layout__content ${
          
          isSidebarCollapsed ? "app-layout__content--sidebar-collapsed" : "app-layout__content--sidebar-expanded"
        }`}
      >
         {isAuthenticated && <Header header_ref={setRef} />}
        <div className="app-layout__route-container">
         <Outlet context={{ route_components_ref: setRef }} />
        </div>
      </main>
        
      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
    </div>
  );
};

export default ProtectedLayout;
