import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { dataPower } from '@/api/mock-data';
Chart.register(...registerables);
interface PowerData {
  zone: string;
  datetime: string;
  powerConsumptionTotal: number;
  powerProductionTotal: number;
  fossilFreePercentage: number;
  renewablePercentage: number;
}
interface SeasonalData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
}
const calculateTrendData = (
  data: PowerData[]
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
  const labels: string[] = [];
  const powerConsumptionData: number[] = [];
  const powerProductionData: number[] = [];
  const fossilFreeData: number[] = [];
  const renewableData: number[] = [];

  data.forEach((item) => {
    labels.push(new Date(item.datetime).toLocaleDateString()); // Định dạng ngày tháng
    powerConsumptionData.push(item.powerConsumptionTotal);
    powerProductionData.push(item.powerProductionTotal);
    fossilFreeData.push(item.fossilFreePercentage);
    renewableData.push(item.renewablePercentage);
  });
  return {
    labels,
    datasets: [
      {
        label: 'Power Consumption Total',
        data: powerConsumptionData,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Power Production Total',
        data: powerProductionData,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Fossil Free Percentage',
        data: fossilFreeData,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Renewable Percentage',
        data: renewableData,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };
};
// Tạo trendData từ rawData
const trendData = calculateTrendData(dataPower);
console.log('🚀 ~ calculateTrendData ~ trendData:', trendData);
const calculateSeasonalData = (data: PowerData[]): SeasonalData => {
  // Khởi tạo các mảng để lưu trữ dữ liệu của từng quý
  const quarterlyData: {
    Q1: {
      powerConsumption: number[];
      powerProduction: number[];
      fossilFree: number[];
      renewable: number[];
    };
    Q2: {
      powerConsumption: number[];
      powerProduction: number[];
      fossilFree: number[];
      renewable: number[];
    };
    Q3: {
      powerConsumption: number[];
      powerProduction: number[];
      fossilFree: number[];
      renewable: number[];
    };
    Q4: {
      powerConsumption: number[];
      powerProduction: number[];
      fossilFree: number[];
      renewable: number[];
    };
  } = {
    Q1: {
      powerConsumption: [],
      powerProduction: [],
      fossilFree: [],
      renewable: [],
    },
    Q2: {
      powerConsumption: [],
      powerProduction: [],
      fossilFree: [],
      renewable: [],
    },
    Q3: {
      powerConsumption: [],
      powerProduction: [],
      fossilFree: [],
      renewable: [],
    },
    Q4: {
      powerConsumption: [],
      powerProduction: [],
      fossilFree: [],
      renewable: [],
    },
  };

  // Phân loại dữ liệu vào các quý tương ứng
  data.forEach((item) => {
    const month = new Date(item.datetime).getMonth(); // Tháng từ 0 đến 11
    if (month < 3) {
      quarterlyData.Q1.powerConsumption.push(item.powerConsumptionTotal);
      quarterlyData.Q1.powerProduction.push(item.powerProductionTotal);
      quarterlyData.Q1.fossilFree.push(item.fossilFreePercentage);
      quarterlyData.Q1.renewable.push(item.renewablePercentage);
    } else if (month < 6) {
      quarterlyData.Q2.powerConsumption.push(item.powerConsumptionTotal);
      quarterlyData.Q2.powerProduction.push(item.powerProductionTotal);
      quarterlyData.Q2.fossilFree.push(item.fossilFreePercentage);
      quarterlyData.Q2.renewable.push(item.renewablePercentage);
    } else if (month < 9) {
      quarterlyData.Q3.powerConsumption.push(item.powerConsumptionTotal);
      quarterlyData.Q3.powerProduction.push(item.powerProductionTotal);
      quarterlyData.Q3.fossilFree.push(item.fossilFreePercentage);
      quarterlyData.Q3.renewable.push(item.renewablePercentage);
    } else {
      quarterlyData.Q4.powerConsumption.push(item.powerConsumptionTotal);
      quarterlyData.Q4.powerProduction.push(item.powerProductionTotal);
      quarterlyData.Q4.fossilFree.push(item.fossilFreePercentage);
      quarterlyData.Q4.renewable.push(item.renewablePercentage);
    }
  });

  // Hàm tính trung bình
  const calculateAverage = (values: number[]) =>
    values.length
      ? values.reduce((sum, value) => sum + value, 0) / values.length
      : 0;

  // Tính trung bình cho từng quý
  const averageData = {
    Q1: {
      powerConsumption: calculateAverage(quarterlyData.Q1.powerConsumption),
      powerProduction: calculateAverage(quarterlyData.Q1.powerProduction),
      fossilFree: calculateAverage(quarterlyData.Q1.fossilFree),
      renewable: calculateAverage(quarterlyData.Q1.renewable),
    },
    Q2: {
      powerConsumption: calculateAverage(quarterlyData.Q2.powerConsumption),
      powerProduction: calculateAverage(quarterlyData.Q2.powerProduction),
      fossilFree: calculateAverage(quarterlyData.Q2.fossilFree),
      renewable: calculateAverage(quarterlyData.Q2.renewable),
    },
    Q3: {
      powerConsumption: calculateAverage(quarterlyData.Q3.powerConsumption),
      powerProduction: calculateAverage(quarterlyData.Q3.powerProduction),
      fossilFree: calculateAverage(quarterlyData.Q3.fossilFree),
      renewable: calculateAverage(quarterlyData.Q3.renewable),
    },
    Q4: {
      powerConsumption: calculateAverage(quarterlyData.Q4.powerConsumption),
      powerProduction: calculateAverage(quarterlyData.Q4.powerProduction),
      fossilFree: calculateAverage(quarterlyData.Q4.fossilFree),
      renewable: calculateAverage(quarterlyData.Q4.renewable),
    },
  };

  return {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Power Consumption',
        data: [
          averageData.Q1.powerConsumption,
          averageData.Q2.powerConsumption,
          averageData.Q3.powerConsumption,
          averageData.Q4.powerConsumption,
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Power Production',
        data: [
          averageData.Q1.powerProduction,
          averageData.Q2.powerProduction,
          averageData.Q3.powerProduction,
          averageData.Q4.powerProduction,
        ],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Fossil Free Percentage',
        data: [
          averageData.Q1.fossilFree,
          averageData.Q2.fossilFree,
          averageData.Q3.fossilFree,
          averageData.Q4.fossilFree,
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Renewable Percentage',
        data: [
          averageData.Q1.renewable,
          averageData.Q2.renewable,
          averageData.Q3.renewable,
          averageData.Q4.renewable,
        ],
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };
};

// Tạo seasonalData từ rawData
const seasonalData = calculateSeasonalData(dataPower);

console.log(seasonalData);

const ChartTwoPower = () => {
  return (
    <div className="flex flex-col space-y-8 p-4">
      <h2 className="text-2xl font-bold">Biểu đồ Trend</h2>
      <Line data={trendData} />

      <h2 className="text-2xl font-bold">Biểu đồ Seasonal</h2>
      <Bar data={seasonalData} />
    </div>
  );
};

export default ChartTwoPower;
