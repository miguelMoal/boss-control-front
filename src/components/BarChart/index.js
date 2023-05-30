//External
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const BarChart = ({ data, categories, width = 500, height = 300 }) => {
  const options = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          colors: [
            "white",
            "white",
            "white",
            "white",
            "white",
            "white",
            "white",
          ],
        },
      },
    },
  };

  const series = [
    {
      name: "Ganancias",
      data: data,
    },
  ];

  return (
    <Chart
      options={options}
      series={series}
      type="bar"
      height={height}
      width={width}
    />
  );
};
export default BarChart;
