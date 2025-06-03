import { Table, Skeleton, ConfigProvider } from "antd";
import "./style.scss";
import Pagination from "../pagination";
import { NoData } from "../../config";
import { memo, useMemo } from "react";

const { Column, ColumnGroup } = Table;

const TableComponent = ({
  summary,
  dataSource,
  columns,
  customHeaderBg,
  customColorBgContainer,
  currentPage,
  totalDoc,
  limit,
  maxVisibleButtons,
  onChangeRecordsPerPage,
  onPageChanged,
  hidePagination,
  hideNoData,
  border = true,
  show_header = true,
  loading = false, // <- Accept a `loading` prop
}) => {
  const totalPages = useMemo(() => Math.ceil(totalDoc / limit), [totalDoc, limit]);

  if (!loading && Array.isArray(dataSource) && dataSource.length === 0 && !hideNoData) {
    return (
      <article className="flex items-center justify-center min-h-[60vh] w-full">
        <NoData />
      </article>
    );
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            colorBgContainer: customColorBgContainer ?? "#F5F9FC",
            headerBg: customHeaderBg ?? "#E1EDF5",
            borderColor: "#D3E4F0",
            colorText: "#252931",
            headerColor: "#252931",
          },
        },
      }}
    >
      <Skeleton
        loading={loading}
        active
        paragraph={{ rows: 5 }}
        className="pms_table_skeleton"
      >
        <Table
          dataSource={dataSource}
          columns={columns}
          className={`pms_table_customize overflow-auto ${!border ? "no-row-borders" : ""}`}
          pagination={false}
          summary={summary}
          showHeader={show_header}
        >
          <ColumnGroup className="highlight">
            {show_header &&
              Array.isArray(columns) &&
              columns.map((column) => (
                <Column
                  className="highlight"
                  title={column.title}
                  dataIndex={column.dataIndex}
                  key={column.dataIndex}
                />
              ))}
          </ColumnGroup>
        </Table>
      </Skeleton>

      {!hidePagination && (
        <Pagination
          className="mt-6"
          currentPage={currentPage ?? 1}
          totalPages={totalPages ?? 1}
          maxVisibleButtons={maxVisibleButtons ?? 5}
          onPageChanged={onPageChanged}
          onChangeRecordsPerPage={onChangeRecordsPerPage}
        />
      )}
    </ConfigProvider>
  );
};

export default memo(TableComponent);
