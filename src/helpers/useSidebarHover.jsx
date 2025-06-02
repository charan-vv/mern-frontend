import { useEffect, useRef, useState } from "react";

export const useSidebarHover = (onToggleCollapse) => {
  const [isHovering, setIsHovering] = useState(false);
  const hoverTimerRef = useRef(null);

  const handleMouseEnter = (isCollapsed) => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    setIsHovering(true);
    if (isCollapsed && typeof onToggleCollapse === 'function') {
      onToggleCollapse(false);
    }
  };

  const handleMouseLeave = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    setIsHovering(false);
    if (typeof onToggleCollapse === 'function') {
      onToggleCollapse(true);
    }
    hoverTimerRef.current = null;
  };

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    };
  }, []);

  return {
    isHovering,
    handleMouseEnter,
    handleMouseLeave,
  };
};
