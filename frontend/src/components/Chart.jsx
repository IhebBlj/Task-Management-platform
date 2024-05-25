import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";


export const Chart = (tasks) => {
console.log(tasks.tasks);
  const todoCount = tasks?.tasks?.filter(task => task.stage === "todo").length;
const inprogressCount = tasks?.tasks?.filter(task => task.stage === "in progress").length;
const completedCount = tasks?.tasks?.filter(task => task.stage === "completed").length;

const chartData = [
  {
    name: "Todo",
    total: todoCount
  },
  {
    name: "In Progress", 
    total: inprogressCount
  },
  {
    name: "Completed",
    total: completedCount
  }
];
  return (
    <ResponsiveContainer width={"100%"} height={300} >
      <BarChart width={150} height={40} data={chartData} >
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray='3 3'/>
        <Bar dataKey='total' fill='#9BC4BC'   />
      </BarChart>
    </ResponsiveContainer>
  );
};

export const ChartPriority = (tasks) => {
  console.log(tasks.tasks);
const HighCount = tasks?.tasks?.filter(task => task.priority === "high").length;
const MediumCount = tasks?.tasks?.filter(task => task.priority === "medium").length;
const NormalCount = tasks?.tasks?.filter(task => task.priority === "normal").length;
const LowCount = tasks?.tasks?.filter(task => task.priority === "low").length;

 const chartPriorityData = [
  {
    name: "High",
    total: HighCount
  },
  {
    name: "Medium", 
    total: MediumCount
  },
  {
    name: "Normal",
    total: NormalCount
  },
  {
    name: "Low",
    total: LowCount
  }
  
];
  return (
    <ResponsiveContainer width={"100%"} height={300} >
      <BarChart width={150} height={40} data={chartPriorityData} >
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray='3 3'/>
        <Bar dataKey='total' fill='#8DDBE0'   />
      </BarChart>
    </ResponsiveContainer>
  );
};

