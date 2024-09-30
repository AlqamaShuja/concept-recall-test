import Metrics from '../Components/dashboard/Metrics';
import UserLineChart from '../Components/dashboard/UserLineChart';
import UserTable from '../Components/user/UserTable';

const Dashboard = () => {
  return (
    <div className='flex flex-col gap-y-5'>
      <Metrics />
      <UserLineChart />
      <UserTable />
    </div>
  );
};

export default Dashboard;