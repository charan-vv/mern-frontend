import React from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import "./style.scss";

const DatePickerComp = ({
    value,
    onChange,
    format = 'YYYY-MM-DD',
    showTime = false,
    placeholder = 'Select Date',
    disabled = false,
    className = '',
    label,
    showAsterisk,
    error,
}) => {

    const handleChange = (date, dateString) => {
        if (onChange) {
            const formattedDate = date ? date.format(format) : null;
            onChange(formattedDate, dateString);
        }
    };

    const formattedValue = value ? dayjs(value) : null;

    return (
        <div className={`date-picker-wrapper  ${className}`}>
            {label && (
                <label className="mb-1 text-[14px]" style={{ display: 'block' }}>
                    {label}
                    {showAsterisk && <span className="asterisk ml-1" style={{ color: "red" }}>*</span>}
                </label>
            )}
            <DatePicker
                value={formattedValue}
                onChange={handleChange}
                format={format}
                showTime={showTime}
                placeholder={placeholder}
                disabled={disabled}
              className={`w-full !p-[10px] ${error ? 'error-border' : ''}`}
            />
             {error && (
                <div className="text-[red] mt-1 ml-2" style={{ fontSize: 12 }}>
                    {error}
                </div>
            )}
        </div>
    );
};

export default DatePickerComp;
