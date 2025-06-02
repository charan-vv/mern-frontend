import { NavLink, useLocation } from "react-router-dom";
import { CaretDownOutlined, LogoutOutlined } from "@ant-design/icons";

const MenuItem = ({
  item,
  isCollapsed,
  expandedItems,
  onSubmenuToggle,
  onLogout,
  depth = 0,
}) => {
  const location = useLocation();

  // Handle logout item
  if (item?.display === "Logout" || item?.type === "logout") {
    return (
      <button
        className="sidebar__logout-btn"
        onClick={onLogout}
        type="button"
        aria-label="Logout"
      >
        <div className="sidebar__menu-item-icon">
          {item?.icon || <LogoutOutlined />}
        </div>
        {!isCollapsed && (
          <div className="sidebar__menu-item-text">{item?.display || "Logout"}</div>
        )}
        {isCollapsed && (
          <div className="sidebar__menu-item-tooltip">
            {item?.display || "Logout"}
          </div>
        )}
      </button>
    );
  }

  if (item?.children && item?.children?.length > 0) {
    const isChildActive = item?.children?.some((child) =>
      location?.pathname?.startsWith(child?.to)
    );
    const isParentActive =
      location?.pathname?.startsWith(item?.to) && !isChildActive;
    const isExpanded = expandedItems[item?.section];

    return (
      <div
        className={`sidebar__menu-parent ${
          isParentActive ? "sidebar__menu-parent--active" : ""
        } ${isExpanded ? "sidebar__menu-parent--expanded" : ""}`}
      >
        <div
          className="sidebar__menu-item"
          onClick={() => onSubmenuToggle(item?.section)}
          title={isCollapsed ? item?.display : ""}
        >
          <div className="sidebar__menu-item-icon">
            {item?.icon}
            {isCollapsed && item?.children && (
              <span className="sidebar__submenu-indicator" />
            )}
          </div>
          {!isCollapsed && (
            <>
              <div className="sidebar__menu-item-text">{item?.display}</div>
              <div
                className={`sidebar__menu-item-arrow ${
                  isExpanded ? "sidebar__menu-item-arrow--rotated" : ""
                }`}
              >
                <CaretDownOutlined />
              </div>
            </>
          )}
          {isCollapsed && (
            <div className="sidebar__menu-item-tooltip">{item?.display}</div>
          )}
        </div>

        <div
          className={`sidebar__submenu ${
            isExpanded ? "sidebar__submenu--expanded" : "sidebar__submenu--collapsed"
          } ${isCollapsed ? "sidebar__submenu--popup" : ""}`}
        >
          {item?.children?.map((child, childIndex) => (
            <MenuItem
              key={childIndex}
              item={child}
              isCollapsed={isCollapsed}
              expandedItems={expandedItems}
              onSubmenuToggle={onSubmenuToggle}
              onLogout={onLogout}
              depth={depth + 1}
            />
          ))}
        </div>
      </div>
    );
  }

  // Handle submenu items (children)
  if (depth > 0) {
    return (
      <NavLink
        to={item?.to}
        className={({ isActive }) =>
          `sidebar__submenu-item ${isActive ? "sidebar__submenu-item--active" : ""}`
        }
        title={isCollapsed ? item?.display : ""}
      >
        <div className="sidebar__submenu-item-icon">{item?.icon}</div>
        {!isCollapsed && (
          <div className="sidebar__submenu-item-text">{item?.display}</div>
        )}
        {isCollapsed && (
          <div className="sidebar__menu-item-tooltip">{item?.display}</div>
        )}
      </NavLink>
    );
  }

  // Handle regular menu items
  return (
    <NavLink
      to={item?.to}
      className={({ isActive }) =>
        `sidebar__menu-item ${isActive ? "sidebar__menu-item--active" : ""}`
      }
      title={isCollapsed ? item?.display : ""}
    >
      <div className="sidebar__menu-item-icon">{item?.icon}</div>
      {!isCollapsed && (
        <div className="sidebar__menu-item-text">{item?.display}</div>
      )}
      {isCollapsed && (
        <div className="sidebar__menu-item-tooltip">{item?.display}</div>
      )}
    </NavLink>
  );
};

export default MenuItem;