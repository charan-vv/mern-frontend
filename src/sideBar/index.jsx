// Sidebar/index.jsx
import { useRef } from "react";
import { sidebarNavItems } from "../utils/sideBarItems";
import { useSidebarState } from "../helpers/useSidebarState";
import { useSidebarHover } from "../helpers/useSidebarHover";
import SidebarLogo from "./components/SidebarLogo";
import SidebarMenu from "./components/SidebarMenu";
import SidebarToggle from "./components/SidebarToggle";
import "./style.scss";
import { useDispatch } from "react-redux";
import { logout_success } from "../redux/feature/auth";

const Sidebar = ({ isCollapsed, onToggleCollapse }) => {
  const sidebarRef = useRef();
  const { expandedItems, activeSubmenu, toggleSubmenu } = useSidebarState(sidebarNavItems);
  const { handleMouseEnter, handleMouseLeave } = useSidebarHover(onToggleCollapse);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout_success());
  };

  const handleSubmenuToggle = (section) => {
    toggleSubmenu(section, isCollapsed);
  };

  const handleToggleClick = () => {
    onToggleCollapse(!isCollapsed);
  };

  return (
    <nav
      ref={sidebarRef}
      onMouseEnter={() => handleMouseEnter(isCollapsed)}
      onMouseLeave={handleMouseLeave}
      className={`sidebar ${isCollapsed ? "sidebar--collapsed" : "sidebar--expanded"}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <SidebarLogo isCollapsed={isCollapsed} />
      
      <SidebarMenu
        items={sidebarNavItems}
        isCollapsed={isCollapsed}
        expandedItems={isCollapsed ? { [activeSubmenu]: true } : expandedItems}
        onSubmenuToggle={handleSubmenuToggle}
        onLogout={handleLogout}
      />
      
      {/* <SidebarToggle 
        isCollapsed={isCollapsed} 
        onToggle={handleToggleClick} 
      /> */}
    </nav>
  );
};

export default Sidebar;