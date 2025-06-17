// SidebarMenu.jsx
import MenuItem from "./MenuItem";

const SidebarMenu = ({
  items,
  isCollapsed,
  expandedItems,
  onSubmenuToggle,
  onLogout,
}) => {
  const role="admin"
 
  return (
    <div className="sidebar__menu">
      {items
      // ?.filter((item) => item?.roles?.includes(role))
      ?.map((item, index) => (
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