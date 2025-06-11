import React from "react";
import { Tag } from "antd";
import { Button } from "../../../index";
import "./style.scss";

const FilterTags = ({ data, onClearFilterData, onRemoveFilterData }) => {

  return (
    <div className="filter-tags-wrapper">
      {data?.map((tag, i) => (
        <Tag
          key={i}
          closable
          className="custom-filter-tag"
          onClose={(e) => {
            e.preventDefault();
            onRemoveFilterData(tag, i);
          }}
        >
          <span>
            {tag?.key
              ?.split("_")
              ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              ?.join(" ")}
          </span>
        </Tag>
      ))}
      <Button
        variant="clearFilterBtn"
        textContent="Clear Filters"
        type="button"
        onClick={() => {
          onClearFilterData();
        }}
      />
    </div>
  );
};

export default FilterTags;
