//External
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const PieChart = ({ data, series, width = 500, height = 300 }) => {
  const options = {
    legend: {
      position: "right",
    },
    chart: {
      type: "pie",
    },
    series: series,
    labels: data,
    // dataLabels: {
    //   enabled: true,
    //   formatter: function (val, opts) {
    //     console.log(">>>", opts);
    //     const seriesName = opts.w.globals.seriesTotals[opts.seriesIndex];
    //     return seriesName;
    //   },
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
