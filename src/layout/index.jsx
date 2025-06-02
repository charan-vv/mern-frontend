import { useEffect, useState } from "react";
import RouteComponent from "../routes";
import Sidebar from "../sidebar";
import Header from "../Header";
import "./style.scss";

const MainLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  const handleSidebarToggle = (collapsed) => {
    setIsSidebarCollapsed(collapsed !== undefined ? collapsed : !isSidebarCollapsed);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    }, 100); // small interval to catch token update quickly

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`app-layout ${!isAuthenticated ? "app-layout--public" : ""}`}>
      {isAuthenticated && (
        <aside className="app-layout__sidebar">
          <Sidebar
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={handleSidebarToggle}
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
        {isAuthenticated && <Header />}
        <div className="app-layout__route-container">
          <RouteComponent />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
