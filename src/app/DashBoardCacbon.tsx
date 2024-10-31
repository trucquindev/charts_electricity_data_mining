import ChartThree from '@/components/cacbon/ChartThree';
import ChartOneCacbon from '@/components/cacbon/ChartsOne';
import ChartTwoCacbon from '@/components/cacbon/ChartTwo';
const DashBoardCacbon = () => {
  return (
    <div className="flex flex-col gap-2">
      <ChartOneCacbon />
      <ChartTwoCacbon />
      <ChartThree />
    </div>
  );
};

export default DashBoardCacbon;
