// components/RecentTransactions.jsx
import React from "react";
import { Tag } from "antd";
import { Table } from "../../../../components";

const RecentTransactions = ({route_components_ref, transactions, loading }) => {
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "default";
        if (status === "Success") color = "green";
        else if (status === "Pending") color = "orange";
        else if (status === "Failed") color = "red";

        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  return (
    <div className="transactions-table">
      <h3 >Recent Transactions</h3>
      <Table 
        columns={columns}
        dataSource={transactions}
        hidePagination={true}
        loading={loading}
        isAddNew={false}
        ref={route_components_ref('transactions')}
      />
    </div>
  );
};

export default RecentTransactions;
