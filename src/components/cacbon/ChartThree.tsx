import { useEffect } from 'react';
import Plotly from 'plotly.js-dist-min';
import { dataCacbon } from '@/api/mock-data';
// Dữ liệu mẫu
const dataShow = dataCacbon.map((item) => {
  return {
    zone: 'US',
    datetime: item.datetime,
    carbonIntensity: item.carbonIntensity,
  };
});
const ChartThree = () => {
  useEffect(() => {
    // Chuyển đổi dữ liệu thành định dạng phù hợp cho Plotly
    const xValues = dataShow.map((data) => data.datetime);
    console.log('🚀 ~ useEffect ~ xValues:', xValues);
    const yValues = dataShow.map((data) => data.carbonIntensity);
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
        title: 'Thời gian',
      },
      yaxis: {
        title: 'Cường độ Cacbon',
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
