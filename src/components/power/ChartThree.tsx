import { useEffect } from 'react';
import Plotly from 'plotly.js-dist-min';
import { dataPower } from '@/api/mock-data';
// Dữ liệu mẫu
const dataShow = dataPower.map((item) => {
  return {
    zone: 'US',
    datetime: item.datetime,
    powerConsumptionTotal: item.powerConsumptionTotal,
    powerProductionTotal: item.powerProductionTotal,
  };
});
const ChartThree = () => {
  useEffect(() => {
    // Chuyển đổi dữ liệu thành định dạng phù hợp cho Plotly
    const xValues = dataShow.map((data) => data.powerConsumptionTotal);
    const yValues = dataShow.map((data) => data.powerProductionTotal);
    const data: Partial<Plotly.Data>[] = [
      {
        x: xValues,
        y: yValues,
        mode: 'markers',
        type: 'scatter',
        marker: { color: 'blue', size: 10 },
      },
    ];

    // Cấu hình layout cho biểu đồ
    const layout = {
      title: 'Biểu đồ Tương quan Giữa Tiêu thụ và Sản xuất Điện',
      xaxis: {
        title: 'Tổng Tiêu thụ Điện',
      },
      yaxis: {
        title: 'Tổng Sản xuất Điện',
      },
    };

    // Vẽ biểu đồ
    Plotly.newPlot('myDiv', data, layout);

    // Cleanup function để tránh xung đột khi component bị unmount
    return () => {
      Plotly.purge('myDiv');
    };
  }, []); // [] đảm bảo effect chỉ chạy một lần khi component được mount

  return <div id="myDiv" style={{ width: '100%', height: '400px' }}></div>;
};

export default ChartThree;
