import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useSidebarState = (sidebarNavItems) => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState({});
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  useEffect(() => {
    const currentPath = location?.pathname;
    const newExpandedItems = {};

    const checkPathMatch = (items) => {
      for (const item of items) {
        if (item?.children) {
          const isChildActive = item?.children?.some(
            (child) =>
              currentPath?.startsWith(child?.to) ||
              checkPathMatch(item?.children)
          );

          if (isChildActive) {
            newExpandedItems[item?.section] = true;
          }
        }
      }
      return false;
    };

    checkPathMatch(sidebarNavItems);
    setExpandedItems(newExpandedItems);
  }, [location?.pathname, sidebarNavItems]);

  const toggleSubmenu = (section, isCollapsed) => {
    if (isCollapsed) {
      setActiveSubmenu(activeSubmenu === section ? null : section);
    } else {
      setExpandedItems((prev) => ({
        ...prev,
        [section]: !prev[section],
      }));
    }
  };

  return {
    expandedItems,
    activeSubmenu,
    toggleSubmenu,
  };
};
