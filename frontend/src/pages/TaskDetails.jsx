


import React, { useState } from "react";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { useParams } from "react-router-dom";
import Loading from "../components/Loader";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import TaskTitle from "../components/TaskTitle";
import { tasks } from "../assets/data";
import AddSubTask from "../components/task/AddSubTask";
import ProjectView from "../components/ProjectView";
import { useGetAllSubtaskQuery, useGetProjectQuery } from "../redux/slices/api/taskApiSlice";
const TABS = [
  { title: "Board View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> },
];

const TASK_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
};

const TaskDetails = () => {
  const { id } = useParams();
const taskID = id;
console.log(taskID);
const params = useParams();
  const [selectedTask, setSelectedTask] = useState({_id:"ejvnkenvklrvklvk",subTasks:[{title:"john"}]});

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const status = params?.status || "";
  const findSelectedTask = () => {
    const task = tasks.find((task) => task._id === id);
    setSelectedTask(task);
  };

  



  const {data,isLoading}= useGetAllSubtaskQuery({taskId:id},{ keepUnusedDataFor: 0 });
  console.log(data);
  
  return loading ? (
    <div className="py-10">
      <Loading />
    </div>
  ) : (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <Title title={data?.taskName ? data?.taskName : "Projects"} />

        {!status && (
          <Button
            onClick={() => setOpen(true)}
            label="Create Task"
            icon={<IoMdAdd className="text-lg" />}
            className="flex flex-row-reverse gap-1 items-center bg-[#0C9E7B] text-white rounded-md py-2 2xl:py-2.5"
          />
        )}
      </div>

        
          <div className="w-full flex justify-between gap-4 md:gap-x-6 py-4">
            <TaskTitle label="To Do" className={TASK_TYPE.todo} />
            <TaskTitle label="In Progress" className={TASK_TYPE["in progress"]} />
            <TaskTitle label="completed" className={TASK_TYPE.completed} />
          </div>


      <ProjectView tasks={data?.subTasks} />
  
      <AddSubTask open={open} setOpen={setOpen}  />
    </div>
  );
};

export default TaskDetails;