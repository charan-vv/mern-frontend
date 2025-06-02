import React, { useCallback, useMemo, useState, useEffect } from "react";
import { Input } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import debounce from "lodash.debounce";

import "./style.scss";
import { SearchIcon } from "../../config";

const CustomTextInput = ({
  label,
  value,
  onChange,
  placeholder = "Enter",
  type = "text",
  error = "",
  disabled = false,
  allowClear = true,
  showAsterisk = false,
  onBlur,
  onFocus,
  className = "",
  ...rest
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const isPassword = type === "password";
  const isSearch = type === "search";
  const isNumber = type === "number";

  const inputType = useMemo(() => {
    if (isPassword) return passwordVisible ? "text" : "password";
    return type;
  }, [isPassword, passwordVisible, type]);

  const debouncedOnChange = useMemo(
    () =>
      debounce((e) => {
        onChange?.(e);
      }, 300),
    [onChange]
  );

  const handleChange = useCallback(
    (e) => {
      setInternalValue(e.target.value);
      debouncedOnChange(e);
    },
    [debouncedOnChange]
  );

  const handlePasswordVisibilityToggle = useCallback(() => {
    setPasswordVisible((prev) => !prev);
  }, []);

  const handleKeyDown = useCallback((event) => {
    if (isNumber && ["e", "E", "+", "-"].includes(event.key)) {
      event.preventDefault();
    }
  }, [isNumber]);

  const handlePaste = useCallback((event) => {
    if (isNumber) {
      const paste = event.clipboardData.getData("text");
      if (/[eE+\-]/.test(paste)) {
        event.preventDefault();
      }
    }
  }, [isNumber]);

  const handleWheel = useCallback((e) => {
    if (isNumber) {
      e.target.blur();
    }
  }, [isNumber]);

  const renderSuffix = useMemo(() => {
    if (isPassword) {
      return (
        <span
          onClick={handlePasswordVisibilityToggle}
          style={{ cursor: "pointer" }}
        >
          {passwordVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
        </span>
      );
    }
    return null;
  }, [isPassword, passwordVisible, handlePasswordVisibilityToggle]);

  const renderPrefix = useMemo(() => {
    if (isSearch) {
      return <SearchIcon />;
    }
    return null;
  }, [isSearch]);

  const inputClassName = useMemo(() => {
    let baseClassName = "textInput__container";
    if (isNumber) {
      baseClassName += " number-input";
    }
    return baseClassName;
  }, [isNumber]);

  return (
    <div className={`textInput__wrapper ${className}`}>
      {label && (
        <label className="mb-1 text-[14px]" style={{ display: "block" }}>
          {label}
          {showAsterisk && (
            <span className="asterisk ml-1" style={{ color: "red" }}>
              *
            </span>
          )}
        </label>
      )}
      <Input
        value={internalValue}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onWheel={handleWheel}
        placeholder={placeholder}
        type={inputType}
        allowClear={allowClear}
        disabled={disabled}
        status={error ? "error" : ""}
        prefix={renderPrefix}
        suffix={renderSuffix}
        autoComplete="off"
        className={inputClassName}
        {...rest}
      />
      {error && (
        <div className="text-[red] mt-1 ml-2" style={{ fontSize: 12 }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default React.memo(CustomTextInput);