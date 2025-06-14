import { Table, Spin } from "antd";
import { ConfigProvider } from "antd";
import { memo, useMemo } from "react";
import { Pagination } from "../index";
import { FilterTags, BottomBlk, TableHeaderBlk } from "./components";

import "./style.scss";

const TableComponent = ({
  page, //name of the page
  summary, //table summary
  loading,
  dataSource, //row data
  columns, //col data
  customHeaderBg, //heading bg color
  customColorBgContainer, //row col bg color
  currentPage, //current pg
  totalDoc, //total page
  limit, //page limit
  maxVisibleButtons, //pagination max pg button
  onChangeRecordsPerPage, //pagination record onchange
  onPageChanged, //pagination pg change
  hidePagination, //hide pagination
  hideNoData, //no data
  isSearch = false, //search bar
  onSearch, //search function
  isFilter = false, //filter btn
  onFilter, //filter function
  isSort = false, //sort btn
  onSort, //sort func
  isAddNew = true, //add new btn
  onAddNew, //add new func
  filteredData = [], //filter result data
  isFilterApplied = false, //filter box true/false
  onRemoveFilterData, //remove filter options
  onClearFilterData, //filter clear
  isBottmBlk = false, //bottom blk
  bottomBlkData = [], //bottom blk data
  expandableConfig = null, //expand code
  isPdfDownload = false, //pdfBtn condition
  onDownload, //Download func
  isPdfDisable, //download button dissabled
  // dropdownItems,
  onDropdownClick,
}) => {
  const totalPages = useMemo(
    () => Math.ceil(totalDoc / limit),
    [totalDoc, limit]
  );

  // if (Array.isArray(dataSource) && dataSource.length === 0 && !hideNoData) {
  //   return (
  //     <article className="flex items-center justify-center min-h-[60vh] w-full">
  //       {/* <Spin /> */}
  //       No Data
  //     </article>
  //   );
  // }

  return (
    <ConfigProvider
      theme={{
        token: {},
        components: {
          Table: {
            colorBgContainer: customColorBgContainer ?? "#fff",
            headerBg: customHeaderBg ?? "#191c36",
            borderColor: "#fff",
            colorText: "#222222",
            headerColor: "#222222",
          },
        },
      }}
    >
      <div className="relative z-[0]">
     
        <TableHeaderBlk
          isSearch={isSearch}
          isFilter={isFilter}
          isSort={isSort}
          onFilter={onFilter}
          onSort={onSort}
          onSearch={onSearch}
          onAddNew={onAddNew}
          isAddNew={isAddNew}
          isPdfDownload={isPdfDownload}
          isPdfDisable={isPdfDisable}
          onDownload={onDownload}
          onDropdownClick={onDropdownClick}
          // dropdownItems={dropdownItems}
        />

        {isFilterApplied && (
          <FilterTags
            data={filteredData}
            onClearFilterData={() => {
              onClearFilterData();
            }}
            onRemoveFilterData={(tag, i) => {
              onRemoveFilterData(tag, i);
            }}
          />
        )}

        <div className="table-wrapper ">
          <Table
            dataSource={dataSource}
            columns={columns}
            className="irgo_table_customize "
            pagination={false}
            summary={summary}
            loading={loading}
            expandable={expandableConfig}
            rowKey="uid"
            scroll={{ x: "max-content" }}
          />
          {isBottmBlk && (
            <>
              <BottomBlk data={bottomBlkData} />
            </>
          )}
        </div>

        {!hidePagination && (
          <Pagination
            className="mt-6"
            currentPage={currentPage ?? 1}
            totalPages={totalPages ?? 1}
            maxVisibleButtons={maxVisibleButtons ?? 5}
            onPageChanged={onPageChanged}
            onChangeRecordsPerPage={onChangeRecordsPerPage}
            customHeaderBg={customHeaderBg}
          />
        )}
      </div>
    </ConfigProvider>
  );
};

export default memo(TableComponent);
