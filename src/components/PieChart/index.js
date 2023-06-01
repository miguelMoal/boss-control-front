//External
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const PieChart = ({ data, series, width = 500, height = 300 }) => {
  const options = {
    colors: ["#fd5d93", "#1d8cf8", "#ff8d72", "#00bf9a", "#ff8d72"],
    legend: {
      position: "right",
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
