import { Chart } from "react-google-charts";

type ColumnChartProps = {
  data: { category_name: string; total_sales: number }[];
  title?: string;
};

type ChartRow = [string, number, string];
type ChartHeader = [string, string, { role: string }];

export default function ElizaColumnChart(props: ColumnChartProps) {
  /* console.log(props)
  console.log(props.data) */

  let chartData: (ChartHeader | ChartRow)[] = [
    ["Name", "Total Sales", { role: "style" }],
  ];

  const options = {
    title: props.title,
  };

  props.data.forEach((el) => {
    chartData.push([el.category_name, el.total_sales, "blue"]);
  });

  //console.log(chartData)
  return (
    <Chart
      chartType="ColumnChart"
      data={chartData}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
}