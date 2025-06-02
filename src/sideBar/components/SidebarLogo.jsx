import { Logo } from "../../config";

const SidebarLogo = ({ isCollapsed }) => {
  return (
    <div className="sidebar__logo">
      <div className={`sidebar__logo-content flex  ${
        isCollapsed ? "sidebar__logo-content--collapsed" : "sidebar__logo-content--expanded"
      }`}>
        <Logo className="h-[40px]" />
        {!isCollapsed && <h2>Budget Bloom</h2>}
      </div>
    </div>
  );
};

export default SidebarLogo;