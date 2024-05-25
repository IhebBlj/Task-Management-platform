import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import styled from 'styled-components';
const data = [
  { month: 'Jan', users: 100 },
  { month: 'Feb', users: 120 },
  { month: 'Mar', users: 150 },
  { month: 'Apr', users: 180 },
  { month: 'May', users: 220 },
  { month: 'Jun', users: 240 },
  { month: 'Jul', users: 280 },
  { month: 'Aug', users: 310 },
  { month: 'Sep', users: 330 },
  { month: 'Oct', users: 350 },
  { month: 'Nov', users: 380 },
  { month: 'Dec', users: 400 },
];
const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h1 {
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }
`;
const UserGrowthChart = () => {
  return (
    <ChartContainer>
    <h1>Users Growth Chart</h1>
    <LineChart
      width={800}
      height={400}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
    </LineChart>
    </ChartContainer>
  );
};

export default UserGrowthChart;