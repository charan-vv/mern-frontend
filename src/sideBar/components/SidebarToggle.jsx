import { DoubleLeftOutlined } from "@ant-design/icons";

const SidebarToggle = ({ isCollapsed, onToggleCollapse }) => {
  const handleToggle = () => {
    if (typeof onToggleCollapse === 'function') {
      onToggleCollapse(!isCollapsed);
    }
  };

  return (
    <div className="sidebar__footer">
      <button className="sidebar__toggle" onClick={handleToggle}>
        <DoubleLeftOutlined
          className={`collapse-icon ${isCollapsed ? "rotated" : ""}`}
        />
      </button>
    </div>
  );
};

export default SidebarToggle;
