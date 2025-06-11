import React from "react";
import { Button,TextInput } from "../../../index";
import { IoFilterSharp } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { HiMiniArrowsUpDown } from "react-icons/hi2";
import { GrDocumentDownload } from "react-icons/gr";


const TableHeaderBlk = ({
  isSearch,
  isFilter,
  isSort,
  onFilter,
  onSort,
  onSearch,
  onAddNew,
  isAddNew,
  isPdfDownload,
  onDownload,
  isPdfDisable,
  // dropdownItems,
  onDropdownClick
}) => {
   const dropdownItems=[
      { key: "download", label: "Download",btn:"download" },
      { key: "preview", label: "Preview",btn:"download" },
    ]
   
    const sortItems=[
      { key: "ascending", label: "Ascending",btn:"sort" },
      { key: "deascending", label: "Deascending",btn:"sort"  },
    ]
  return (
    <div>
      {(isSearch ||isAddNew || isFilter || isSort || isPdfDownload) && (
        <div className="flex justify-end gap-2 items-center mb-4">
          <div className="flex items-center gap-2">
            {isSearch && (
              <TextInput
                onChange={onSearch}
                type="search"
                placeholder="Search"
              />
            )}
          </div>
          <div className="flex items-center gap-2">
            {isAddNew && (
              <Button
                variant="primary"
                textContent="Add New"
                type="button"
                onClick={onAddNew}
                icon={<IoMdAdd />}
                
              />
            )}
           
            {isPdfDownload && (
              <Button
                variant="primary"
                textContent="Download"
                type="button"
                onClick={onDownload}
                disabled={isPdfDisable}
                icon={<GrDocumentDownload />}
                dropdownBtn={true}
                dropdownItems={dropdownItems}
                onDropdownClick={onDropdownClick}
              />
            )}
            {isFilter && (
              <Button
                variant="filterBtn"
                textContent="Filter"
                type="button"
                onClick={onFilter}
                icon={<IoFilterSharp />}
              />
            )}
            {isSort && (
              <Button
                variant="sortBtn"
                textContent="Sort"
                type="button"
                onClick={onSort}
                icon={<HiMiniArrowsUpDown />}
                dropdownBtn={true}
                dropdownItems={sortItems}
                onDropdownClick={onDropdownClick}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TableHeaderBlk;
