import { Card } from 'antd';
const Metrics = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <Card title="Total Users" className="text-center">
        <div className="flex justify-center items-center h-full">1000</div>
      </Card>
      <Card title="Total Followers & Followings" className="text-center">
        <div className="flex justify-center items-center h-full">5000</div>
      </Card>
      <Card title="Total Posts" className="text-center">
        <div className="flex justify-center items-center h-full">200</div>
      </Card>
    </div>
  );
};

export default Metrics;
