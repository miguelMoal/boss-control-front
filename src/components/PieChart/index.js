//External
import dynamic from "next/dynamic";

//Redux
import { useSelector } from "react-redux";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const PieChart = ({ data, series, width = 500, height = 300 }) => {
  const { secondaryColor, error, warning, success } = useSelector(
    ({ theme }) => theme
  );

  const options = {
    colors: [error, secondaryColor, "#ff8d72", success, warning],
    legend: {
      position: "bottom",
      labels: {
        colors: "white", // Cambiar el color de los elementos de leyenda
      },
    },
    chart: {
      type: "pie",
    },
    series: series,
    labels: data,
    // dataLabels: {
    // enabled: true,
    // formatter: function (val, opts) {
    //   console.log(">>>", opts);
    //   const seriesName = opts.w.globals.seriesTotals[opts.seriesIndex];
    //   return seriesName;
    // },
    // },
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
