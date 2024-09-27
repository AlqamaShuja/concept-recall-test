import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const generateLastTenDaysData = () => {
    const data = [];
    const today = new Date();
    
    // Loop to generate the last 10 days
    for (let i = 0; i < 10; i++) {
      const date = new Date(today); // Copy current date
      date.setDate(today.getDate() - i); // Subtract i days
  
      // Format the date as YYYY-MM-DD
      const formattedDate = date.toISOString().split('T')[0]; 
  
      // Generate random users data for each day (you can adjust this)
      const users = Math.floor(Math.random() * 100) + 1;
  
      // Push the data for each day to the array
      data.push({ date: formattedDate, users });
    }
  
    // Reverse the array to have the most recent date last
    return data.reverse();
};

const data = generateLastTenDaysData();

const UserLineChart = () => (
  <div className="bg-white py-4 px-3">
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="users" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default UserLineChart;
