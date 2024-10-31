import ChartOnePower from '@/components/power/ChartOne';
import ChartTwoPower from '@/components/power/ChartTwo';
import ChartThreePower from '@/components/power/ChartThree';
const DashBoardPower = () => {
  return (
    <div className="flex flex-col gap-4">
      <ChartOnePower />
      <ChartTwoPower />
      <ChartThreePower />
    </div>
  );
};

export default DashBoardPower;
