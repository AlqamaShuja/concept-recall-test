import React, { useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsersPostsOverTime } from '../../slice/metricsSlice';
import Loader from '../Loader/loader';

// Helper function to round up to the nearest multiple of 25
const roundUpToNearest25 = (value) => {
  return Math.ceil(value / 25) * 25;
};

const UserLineChart = () => {
  const dispatch = useDispatch();
  const { usersOverTime, postsOverTime, status } = useSelector((state) => state.metrics);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsersPostsOverTime());  // Dispatch the thunk to fetch data
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'failed') {
    return <div>Error loading data</div>;
  }

  // Map the fetched data to the chart format
  const chartData = usersOverTime?.map((userEntry) => {
    const postEntry = postsOverTime?.find((p) => p.date === userEntry.date) || { count: 0 };
    return {
      date: userEntry.date,
      users: userEntry.count,
      posts: postEntry.count,
    };
  });

  const maxUsers = Math.max(...usersOverTime?.map((user) => user.count));
  const maxPosts = Math.max(...postsOverTime?.map((post) => post.count));
  const maxCount = roundUpToNearest25(Math.max(maxUsers, maxPosts) + 10);

  return (
    <div className="bg-white py-4 px-3">
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis 
            domain={[0, maxCount]} 
            tickCount={Math.ceil(maxCount / 25) + 1}
            tickFormatter={(tick) => (tick % 25 === 0 ? tick : '')}
          />
          <Tooltip />
          <Line type="monotone" dataKey="users" stroke="#8884d8" />
          <Line type="monotone" dataKey="posts" stroke="green" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserLineChart;