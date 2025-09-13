import { Chart } from "react-google-charts";

export default function ElizaColumnChart(props) {
  console.log(props)
  console.log(props.data)

  let chartData = [["Name", "Total Sales", { role: "style" }]]

  const options = {
    title: props.title,
  };

  props.data.forEach(el => {
    //console.log(el)
    chartData.push([el.category_name, el.total_sales, "blue"])
  })

  console.log(chartData)
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