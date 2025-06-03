import { useEffect, useState } from "react";
import {
  DashboardCard,
    DashboardChart,
    DashboardTranscations,
    BalanceCards,
} from "./components";
import data from "./data.json";
import { Layout, theme } from "antd";

const { Content } = Layout;

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Content className="p-6">
      <div
        className="p-6 min-h-[calc(100vh-112px)]"
        style={{
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        {/* Top Cards Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <DashboardCard cardData={data?.cards} loading={loading} />
          </div>
          <div className="lg:col-span-4">
            <BalanceCards loading={loading} cards={data?.balanceCards} />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          <div className="lg:col-span-8">
            <DashboardTranscations
              loading={loading}
              transactions={data?.transactions}
            />
          </div>
          <div className="lg:col-span-4">
            <DashboardChart loading={loading} chartData={data?.reportChart} />
          </div>
        </div>
      </div>
    </Content>
  );
};

export default Dashboard;