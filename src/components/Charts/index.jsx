// components/ChartWrapper.jsx
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import {
  Line,
  Bar,
  Doughnut,
  Pie,
  Radar,
  PolarArea
} from "react-chartjs-2";
import { Skeleton, Card } from "antd";
import "./style.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const chartTypes = {
  line: Line,
  bar: Bar,
  doughnut: Doughnut,
  pie: Pie,
  radar: Radar,
  polarArea: PolarArea
};

const ChartWrapper = ({
  type = "bar",
  data,
  options,
  title,
  total,
  loading = false
}) => {
  const ChartComponent = chartTypes[type] || Bar;

  return (
    <Card className="chart-wrapper">
      <Skeleton loading={loading} active>
        {title && <h3>{title}</h3>}
        <ChartComponent data={data} options={options} />
        {typeof total !== "undefined" && (
          <p className="chart-total">Total: {total.toLocaleString()}</p>
        )}
      </Skeleton>
    </Card>
  );
};

export default ChartWrapper;
