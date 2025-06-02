// SidebarMenu.jsx
import MenuItem from "./MenuItem";

const SidebarMenu = ({
  items,
  isCollapsed,
  expandedItems,
  onSubmenuToggle,
  onLogout,
}) => {
  return (
    <div className="sidebar__menu">
      {items?.map((item, index) => (
        <MenuItem
          key={item.id || index}
          item={item}
          isCollapsed={isCollapsed}
          expandedItems={expandedItems}
          onSubmenuToggle={onSubmenuToggle}
          onLogout={onLogout}
        />
      ))}
    </div>
  );
};

export default SidebarMenu;