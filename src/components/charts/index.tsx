import { PieChart } from '@mui/x-charts/PieChart';

export default function BasicPie({chartData}:any) {
  return (
    <PieChart
      series={[
        {
          data: chartData
        },
      ]}
      width={400}
      height={200}
    />
  );
}
