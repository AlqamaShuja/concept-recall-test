import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
// import { fetchUsers } from './features/users/userSlice';
import Metrics from '../Components/dashboard/Metrics';
import UserLineChart from '../Components/dashboard/UserLineChart';
import UserTable from '../Components/user/UserTable';

const Dashboard = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  
  useEffect(() => {
    // dispatch(fetchUsers());
  }, []);

  return (
    <div className='flex flex-col gap-y-5'>
      <Metrics />
      <UserLineChart />
      <UserTable />
    </div>
  );
};

export default Dashboard;