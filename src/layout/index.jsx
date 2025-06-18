import { useEffect, useState, useRef } from "react";
import RouteComponent from "../routes";
import Sidebar from "../sidebar";
import Header from "../Header";
import "./style.scss";
import { Tour } from "src/components";
import getTourSteps from "src/utils/Tour";
import SpinnerComponent from "src/components/Spinner";

const MainLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  const [open, setOpen] = useState(false);
  const refs = useRef({});

  
  const setRef = (key) => (el) => {
    if (el) refs.current[key] = el;
  };
  const steps = getTourSteps(refs);


  const handleSidebarToggle = (collapsed) => {
    setIsSidebarCollapsed(collapsed !== undefined ? collapsed : !isSidebarCollapsed);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`app-layout ${!isAuthenticated ? "app-layout--public" : ""}`}>
      {isAuthenticated && (
        <aside className="app-layout__sidebar">
          <Sidebar
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={handleSidebarToggle}
            side_bar_ref={setRef("sidebar")}
          />
        </aside>
      )}
      <main
        className={`app-layout__content ${
          isAuthenticated
            ? isSidebarCollapsed
              ? "app-layout__content--sidebar-collapsed"
              : "app-layout__content--sidebar-expanded"
            : "app-layout__content--full-width"
        }`}
      >
        {isAuthenticated && <Header header_ref={setRef} />}
        <div className="app-layout__route-container">
            <SpinnerComponent />
          <RouteComponent route_components_ref={setRef} />
        </div>
      </main>

      
       <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
    </div>
  );
};

export default MainLayout;
