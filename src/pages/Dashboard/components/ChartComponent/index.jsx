import { Card, Skeleton, Typography } from "antd";
import { Pie } from "@ant-design/charts";
import { DollarOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const DashboardChart = ({ chartData, loading }) => {
  const data = chartData?.labels?.map((label, index) => ({
    type: label,
    value: chartData.percentages[index],
    color: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"][index],
  })) || [];

  const config = {
    data,
    angleField: "value",
    colorField: "type",
    color: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"],
    radius: 0.8,
    innerRadius: 0.6,
    label: {
      type: "inner",
      offset: "-50%",
      content: "{value}%",
      style: {
        textAlign: "center",
        fontSize: 14,
      },
    },
    interactions: [{ type: "element-selected" }, { type: "element-active" }],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          fontSize: "24px",
          fontWeight: "bold",
        },
        content: `${chartData?.total || '$0'}\nTotal`,
      },
    },
  };

  return (
    <Card
      className="h-full"
      title={
        <div className="flex items-center gap-2">
          <DollarOutlined />
          <span>Transaction Breakdown</span>
        </div>
      }
    >
      <Skeleton loading={loading} active paragraph={{ rows: 6 }}>
        <div style={{ height: 300 }}>
          {!loading && <Pie {...config} />}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {data?.map((item) => (
            <div key={item.type} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <Text type="secondary">{item.type}</Text>
              <Text strong className="ml-auto">
                {item.value}%
              </Text>
            </div>
          ))}
        </div>
      </Skeleton>
    </Card>
  );
};

export default DashboardChart;