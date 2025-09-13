import { Chart } from "react-google-charts";

export default function ElizaChart(props) {
  //console.log(props.data)

  let chartData = [["Name", "Price"]]

  const options = {
    title: props.title,
  };

  props.data.forEach(el => {
    //console.log(el)
    chartData.push([el.product_name, el.total_price])
  })

  //console.log(chartData)
  return (
    <Chart
      chartType="PieChart"
      data={chartData}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
}