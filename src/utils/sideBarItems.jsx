import {
  DashboardOutlined,
  FileTextOutlined,
  FileDoneOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

export const sidebarNavItems = [
  {
    display: "Dashboard",
    icon: <DashboardOutlined />,
    to: "/dashboard",
    section: "Dashboard",
  },
  {
    display: "Transactions",
    icon: <FileDoneOutlined />,
    to: "/transactions",
    section: "Transactions",
  },
  {
    display: "Budget",
    icon: <FileTextOutlined />,
    to: "/budget",
    section: "Budget",
  },
  {
    display: "Categories",
    icon: <FileDoneOutlined />,
    to: "/categories",
    section: "Categories",
    // children: [
    //   {
    //     display: "Daily Report",
    //     to: "/DailyReport",
    //     icon: <FileDoneOutlined />,
    //     section: "DailyReport"
    //   },
    //   {
    //     display: "Monthly Report",
    //     to: "/MonthlyReport",
    //     icon: <FileDoneOutlined />,
    //     section: "MonthlyReport"
    //   },
    //   {
    //     display: "Annual Report",
    //     to: "/AnnualReport",
    //     icon: <FileDoneOutlined />,
    //     section: "AnnualReport"
    //   }
    // ]
  },
  {
    display: "Reports",
    icon: <FileDoneOutlined />,
    to: "/reports",
    section: "Reports",
  },
  
  {
    display: "Settings",
    icon: <FileDoneOutlined />,
    to: "/settings",
    section: "Settings",
  },

  {
    display: "Logout",
    icon: <LogoutOutlined />,
    section: "Logout",
  },
];
