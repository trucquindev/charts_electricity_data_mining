import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="text-black flex flex-col gap-4 justify-center items-center h-screen">
      <p>Helo mọi người</p>
      <div className="flex gap-3">
        <Button onClick={() => navigate('/cacbon')}>Dashboard Cacbon</Button>
        <Button onClick={() => navigate('/power')}>Dashboard Power</Button>
      </div>
    </div>
  );
};

export default Dashboard;
