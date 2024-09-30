import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from 'antd';
import Loader from '../Loader/loader';
import Axios from '../../../utils/axiosConfig';
import { useDispatch } from 'react-redux';
import { fetchUserGrowthOfPostAndFollowData } from '../../slice/userSlice';

const UserFollowGrowthAndPostChart = ({ userId }) => {
  const [followersOverTime, setFollowersOverTime] = useState([]);
  const [followingsOverTime, setFollowingsOverTime] = useState([]);
  const [postsOverTime, setPostsOverTime] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserGrowthOfPostAndFollowData(userId)).unwrap()
      .then((response) => {
        const { followersOverTime = [], followingsOverTime = [], postsOverTime = [] } = response;
        // console.log(response, "== Fetched Data");

        setFollowersOverTime(followersOverTime);
        setFollowingsOverTime(followingsOverTime);
        setPostsOverTime(postsOverTime);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <Loader />;

  // Generate the last 10 days as X-axis labels using native JS
  const getLast10Days = () => {
    const result = [];
    const today = new Date();
    for (let i = 9; i >= 0; i--) {
      const pastDate = new Date(today);
      pastDate.setDate(today.getDate() - i);
      const formattedDate = pastDate.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
      result.push(formattedDate);
    }
    return result;
  };

  const last10Days = getLast10Days();

  // Combine the data for chart, even if some days don't have data
  const chartData = last10Days?.map((date) => {
    const followerEntry = followersOverTime?.find((f) => f.date === date) || { followers: 0 };
    const followingEntry = followingsOverTime?.find((f) => f.date === date) || { followings: 0 };
    const postEntry = postsOverTime?.find((p) => p.date === date) || { posts: 0 };

    return {
      date,
      followers: followerEntry.followers || 0,
      followings: followingEntry.followings || 0,
      posts: postEntry.posts || 0,
    };
  });

  // Get max count to adjust Y axis range
  const maxCount = Math.max(
    ...chartData?.map((data) => Math.max(data.followers, data.followings, data.posts))
  ) + 10;

  return (
    <div>
      <Card title="Followers, Followings, and Posts Over Last 10 Days" className="mb-4">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, maxCount]} />
            <Tooltip />
            <Line type="monotone" dataKey="followers" stroke="orange" />
            <Line type="monotone" dataKey="followings" stroke="black" />
            <Line type="monotone" dataKey="posts" stroke="green" />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default UserFollowGrowthAndPostChart;
