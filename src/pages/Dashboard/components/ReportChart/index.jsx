
import {ChartJs} from "../../../../components"


const ChartContainer = ({ loading, chartData }) => {

  const transformedChartData = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Budget Breakdown',
        data: chartData.percentages,
        backgroundColor: ['#4caf50', '#f44336', '#2196f3'],
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="mt-6 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Chart Display */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="h-96">
            <ChartJs type="pie" data={transformedChartData} />
          </div>
        </div>
      </div>
    </div>
  );
};


export default ChartContainer;