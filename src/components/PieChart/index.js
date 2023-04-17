//External
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const PieChart = ({ data, series, width = 400, height = 300 }) => {
  const options = {
    legend: {
      position: "bottom",
    },
    chart: {
      type: "pie",
    },
    series: series,
    labels: data,
  };

  return (
    <Chart
      options={options}
      series={options.series}
      type="pie"
      height={height}
      width={width}
    />
  );
};

export default PieChart;
