import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Alert } from 'antd';
import { fetchMetrics } from '../../slice/metricsSlice';

const Metrics = () => {
  const dispatch = useDispatch();
  const { total_users, total_posts, total_followers, total_followings, status, error } = useSelector((state) => state.metrics);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMetrics());
    }
  }, [status, dispatch]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {status === 'failed' && <Alert message={error} type="error" />}
      <Card title="Total Users" className="text-center">
        <div className="flex justify-center items-center h-full">{total_users}</div>
      </Card>
      <Card title="Total Followers & Followings" className="text-center">
        <div className="flex justify-center items-center h-full">
          {total_followers + total_followings}
        </div>
      </Card>
      <Card title="Total Posts" className="text-center">
        <div className="flex justify-center items-center h-full">{total_posts}</div>
      </Card>
    </div>
  );
};

export default Metrics;
