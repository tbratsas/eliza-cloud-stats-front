import { useMemo } from "react";
import { Chart } from "react-google-charts";

type PieChartProps = {
  data: { product_name: string; total_sales: number }[];
  title: string;
};

export default function PieChart({ data, title }: PieChartProps) {
  const chartData = useMemo(() => {
    const result: (string | number)[][] = [["Name", "Total Price"]];
    data?.forEach(el => {
      result.push([el.product_name, el.total_sales]);
    });
    return result;
  }, [data]);

  const options = {
    title,
    pieHole: 0.3, // optional: makes it a donut chart
    legend: { position: "bottom" },
  };

  return (
    <Chart
      chartType="PieChart"
      data={chartData}
      options={options}
      width="100%"
      height="400px"
    />
  );
}
