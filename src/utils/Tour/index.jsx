const getTourSteps = (refs) => [
  // Sidebar
  {
    title: "Sidebar",
    description: "Use the sidebar to navigate between different sections like Dashboard, Reports, Settings, and more.",
    target: () => refs.current.sidebar,
  },

  // Header
  {
    title: "Settings",
    description: "Click here to manage your account preferences, appearance, and system settings.",
    target: () => refs.current.settings,
  },
  {
    title: "Notifications",
    description: "Stay updated with recent alerts, reminders, or system messages.",
    target: () => refs.current.notification,
  },
  {
    title: "User Profile",
    description: "Access your profile details or log out from your account.",
    target: () => refs.current.user,
  },

  // Dashboard content
  {
    title: "Total Balance",
    description: "Shows the sum of all your account balances — including budget, income, and expenses.",
    target: () => refs.current.totalBalance,
  },
  {
    title: "Budget",
    description: "Displays your planned monthly or weekly budget to help track your spending goals.",
    target: () => refs.current.budget,
  },
  {
    title: "Expenses",
    description: "View the total amount you've spent so far within the selected timeframe.",
    target: () => refs.current.expends,
  },
  {
    title: "Income",
    description: "Displays the total income received during the current period.",
    target: () => refs.current.income,
  },
  {
    title: "Balance Cards",
    description: "Overview of your credit/debit cards, balances, and quick stats.",
    target: () => refs.current.balanceCard,
  },
  {
    title: "Recent Transactions",
    description: "Check your latest income and expense records in one place.",
    target: () => refs.current.transactions,
  },
];

export default getTourSteps;
