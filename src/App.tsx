import { Routes, Route } from 'react-router-dom';
import Dashboard from './app/Dashboard';
import DashBoardCacbon from './app/DashBoardCacbon';
import DashBoardPower from './app/DashBoardPower';
function App() {
  return (
    <div className="text-red-400">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/cacbon" element={<DashBoardCacbon />} />
        <Route path="/power" element={<DashBoardPower />} />
      </Routes>
    </div>
  );
}

export default App;
