import React from "react";
import { Table, Tag, Typography, Avatar, Skeleton, Card } from "antd";
import {
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

const statusMap = {
  Success: {
    icon: <CheckCircleOutlined />,
    color: "green",
  },
  Pending: {
    icon: <SyncOutlined spin />,
    color: "orange",
  },
  Failed: {
    icon: <CloseCircleOutlined />,
    color: "red",
  },
};

const DashboardTransactions = ({ transactions, loading }) => {
  const columns = [
    {
      title: "Transaction",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <div className="flex items-center gap-3">
          <Avatar
            style={{
              backgroundColor: record.bgColor,
            }}
          >
            {record.icon}
          </Avatar>
          <div>
            <Text strong>{text}</Text>
            <br />
            <Text type="secondary" className="text-xs">
              {record.date}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      align: "right",
      render: (text) => (
        <Text strong className="text-base">
          ${text}
        </Text>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => (
        <Tag
          icon={statusMap[status].icon}
          color={statusMap[status].color}
          className="flex items-center gap-1"
        >
          {status}
        </Tag>
      ),
    },
  ];

  return (
    <Card
      title="Recent Transactions"
      extra={<a href="#">View All</a>}
      className="h-full"
    >
      <Skeleton loading={loading} active paragraph={{ rows: 5 }}>
        <Table
          columns={columns}
          dataSource={transactions}
          pagination={false}
          size="middle"
          rowKey="id"
          className="transactions-table"
        />
      </Skeleton>
    </Card>
  );
};

export default DashboardTransactions;