import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";

import "./style.scss";

const Button = (props) => {
  const {
    variant = "primary",
    textContent,
    type = "button",
    onClick,
    isLoading=false,
    style,
    className,
    disabled,
    icon,
    dropdownBtn = false,
    dropdownItems = [],
    onDropdownClick = () => {},
  } = props;

  const [visible, setVisible] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!dropdownBtn) return;

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownBtn]);

  const handleDropdownClick = (item) => {
    onDropdownClick(item);
    setVisible(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type={type}
        className={`budget_btn_wrapper ${variant} ${className || ""} ${
          disabled ? "opacity-50" : ""
        }`}
        style={{
          ...style,
          ...(disabled && { cursor: "no-drop" }),
        }}
        onClick={(e)=>{
          if(dropdownBtn){
            e.preventDefault();
            e.stopPropagation();
            setVisible((prev) => !prev);
          }else if (onClick) {
            onClick(e)
          }
        }}
        disabled={disabled}
      >
        <div className="flex justify-center items-center gap-3">
          {icon && React.cloneElement(icon, { size: 18 })}
          {!isLoading && textContent}
          {dropdownBtn &&<IoIosArrowDown 
           className={`transition-transform  ${
            visible ? "rotate-180" : "rotate-0"
          }`}
          onClick={(e) => {
          if (dropdownBtn) {
            e.preventDefault();
            e.stopPropagation();
            setVisible((prev) => !prev);
          } 
        }} />}
        </div>
        {isLoading && (
          <div className="btn_spinner" aria-label="Loading..." role="status">
            <svg className="h-6 w-6 animate-spin" viewBox="0 0 256 256">
              {/* spinner lines */}
              <line x1="128" y1="32" x2="128" y2="64" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
              <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
              <line x1="224" y1="128" x2="192" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
              <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
              <line x1="128" y1="224" x2="128" y2="192" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
              <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
              <line x1="32" y1="128" x2="64" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
              <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
            </svg>
          </div>
        )}
      </button>

      {/* Dropdown menu when dropdownBtn is true */}
      {dropdownBtn && visible && (
        <div className="absolute budget_dropdown_menu  budget_cursor_pointer mt-1 w-40  rounded-md shadow-lg bg-white  z-10">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {dropdownItems?.map((item) => (
              <button
                key={item.key}
                className="w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 budget_cursor_pointer"
                role="menuitem"
                onClick={() => handleDropdownClick(item)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Button;