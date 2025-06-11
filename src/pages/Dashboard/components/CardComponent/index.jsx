import React from "react";
import { Card, Skeleton, Progress, Typography } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  DollarOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

const { Text, Title } = Typography;

const iconMap = {
  revenue: <DollarOutlined className="text-green-500" />,
  users: <UserOutlined className="text-blue-500" />,
  orders: <ShoppingCartOutlined className="text-purple-500" />,
  profit: <DollarOutlined className="text-orange-500" />,
};

const DashboardCard = ({ cardData, loading }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {(loading ? Array(4).fill({}) : cardData)?.map((item, index) => (
        <Card key={item?.id || index} className="h-full">
          <Skeleton loading={loading} active>
            {item && (
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <Text type="secondary" className="uppercase text-xs">
                    {item.title}
                  </Text>
                  <div className="p-2 rounded-lg bg-gray-100">
                    {iconMap[item.icon]}
                  </div>
                </div>
                <Title level={3} className="mb-1">
                  {item.value}
                </Title>
                <div className="mt-auto">
                  <div className="flex items-center">
                    {item.trend > 0 ? (
                      <ArrowUpOutlined className="text-green-500 mr-1" />
                    ) : (
                      <ArrowDownOutlined className="text-red-500 mr-1" />
                    )}
                    <Text
                      type={item.trend > 0 ? "success" : "danger"}
                      className="mr-2"
                    >
                      {Math.abs(item.trend)}%
                    </Text>
                    <Text type="secondary">vs last period</Text>
                  </div>
                  <Progress
                    percent={item.progress}
                    showInfo={false}
                    strokeColor={item.trend > 0 ? "#52c41a" : "#f5222d"}
                    size="small"
                    className="mt-2"
                  />
                </div>
              </div>
            )}
          </Skeleton>
        </Card>
      ))}
    </div>
  );
};

export default DashboardCard;