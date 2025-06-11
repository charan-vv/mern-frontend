import React, { memo, useMemo } from 'react';
import { Select } from 'antd';
import './style.scss';

const { Option } = Select;

const CustomDropdown = ({
    label,
    options = [],
    value,
    onChange,
    placeholder = 'Select',
    showSearch = false,
    disabled = false,
    allowClear = true,
    loading = false,
    error = '',
    showAsterisk = false,
    onBlur,
    ...rest
}) => {

    const memoizedOptions = useMemo(() => {
        return options.map((opt) => (
            <Option key={opt.value} value={opt.value}>
                {opt.label}
            </Option>
        ));
    }, [options]);

    return (
        <div className="custom-dropdown w-full">
            {label && (
                <label className="mb-1 text-[14px]" style={{ display: 'block' }}>
                    {label}
                    {showAsterisk && (
                        <span className="asterisk ml-1" style={{ color: "red" }}>
                            *
                        </span>
                    )}
                </label>
            )}
            <Select
                className='w-full dropdown__wrapper'
                showSearch={showSearch}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                onBlur={onBlur}
                allowClear={allowClear}
                loading={loading}
                status={error ? 'error' : ''}
                filterOption={(input, option) =>
                    option?.children?.toLowerCase().includes(input.toLowerCase())
                }
                {...rest}
            >
                {memoizedOptions}
            </Select>

            {error && (
                <div className="text-[red] mt-1 ml-2" style={{ fontSize: 12 }}>
                    {error}
                </div>
            )}
        </div>
    );
};

export default memo(CustomDropdown);
