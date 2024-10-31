import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { dataCacbon } from '@/api/mock-data';
Chart.register(...registerables);
interface CarbonData {
  zone: string;
  carbonIntensity: number;
  datetime: string; // Bạn có thể thay đổi kiểu này nếu cần
  updatedAt: string;
  createdAt: string;
  emissionFactorType: string;
  isEstimated: boolean;
  estimationMethod: string;
}
interface QuarterlyData {
  Q1: number[];
  Q2: number[];
  Q3: number[];
  Q4: number[];
}
const trendData = {
  labels: dataCacbon.map((data) =>
    new Date(data.datetime).toLocaleDateString()
  ),
  datasets: [
    {
      label: 'Cường độ carbon',
      data: dataCacbon.map((data) => data.carbonIntensity),
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      fill: true,
    },
  ],
};

const calculateSeasonalData = (
  data: CarbonData[]
): {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
} => {
  const quarterlyData: QuarterlyData = {
    Q1: [],
    Q2: [],
    Q3: [],
    Q4: [],
  };

  // Phân loại dữ liệu vào các quý
  data.forEach((item) => {
    const month = new Date(item.datetime).getMonth(); // Tháng từ 0 đến 11
    if (month < 3) quarterlyData.Q1.push(item.carbonIntensity); // Q1
    else if (month < 6) quarterlyData.Q2.push(item.carbonIntensity); // Q2
    else if (month < 9) quarterlyData.Q3.push(item.carbonIntensity); // Q3
    else quarterlyData.Q4.push(item.carbonIntensity); // Q4
  });

  // Tính trung bình cho từng quý
  const averageData = {
    Q1: quarterlyData.Q1.length
      ? quarterlyData.Q1.reduce((sum, val) => sum + val) /
        quarterlyData.Q1.length
      : 0,
    Q2: quarterlyData.Q2.length
      ? quarterlyData.Q2.reduce((sum, val) => sum + val) /
        quarterlyData.Q2.length
      : 0,
    Q3: quarterlyData.Q3.length
      ? quarterlyData.Q3.reduce((sum, val) => sum + val) /
        quarterlyData.Q3.length
      : 0,
    Q4: quarterlyData.Q4.length
      ? quarterlyData.Q4.reduce((sum, val) => sum + val) /
        quarterlyData.Q4.length
      : 0,
  };

  return {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Cường độ carbon theo Quý',
        data: [averageData.Q1, averageData.Q2, averageData.Q3, averageData.Q4],
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };
};
const seasonalData = calculateSeasonalData(dataCacbon);
const ChartTwoCacbon = () => {
  return (
    <div className="flex flex-col space-y-8 p-4">
      <h2 className="text-2xl font-bold">Biểu đồ Trend</h2>
      <Line data={trendData} />

      <h2 className="text-2xl font-bold">Biểu đồ Seasonal</h2>
      <Bar data={seasonalData} />
    </div>
  );
};

export default ChartTwoCacbon;
