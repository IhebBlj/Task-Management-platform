
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { MdGridView } from "react-icons/md";
import { useParams } from "react-router-dom";
import Loading from "../components/Loader";
import Title from "../components/Title";

import Tabs from "../components/Tabs";
import TaskTitle from "../components/TaskTitle";
import BoardView from "../components/BoardView";
import { tasks } from "../assets/data";
const ProjectDetails = ({ tasks }) => {
 

 
    const todoTasks = tasks.filter((task) => task.stage === "todo");
    const inProgressTasks = tasks.filter((task) => task.stage === "in progress");
    const completedTasks = tasks.filter((task) => task.stage === "completed");

    return (
      <div className="w-full py-4 flex gap-4">
        <div className="w-full">
          <div className="grid grid-cols-1 gap-4">
            {todoTasks.map((task, index) => (
              <subCard task={task} key={index} />
            ))}
          </div>
        </div>
        <div className="w-full">
          <div className="grid grid-cols-1 gap-4">
            {inProgressTasks.map((task, index) => (
              <subCard task={task} key={index} />
            ))}
          </div>
        </div>
        <div className="w-full">
          <div className="grid grid-cols-1 gap-4">
            {completedTasks.map((task, index) => (
              <subCard task={task} key={index} />
            ))}
          </div>
        </div>
      </div>
    );
            };





const TABS = [
  { title: "Board View", icon: <MdGridView /> },
];

const TASK_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
};

const Detail = () => {
  const { id } = useParams();
  console.log(id);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const task = tasks.find((task) => task._id === id);
      setSelectedTask(task);
    } else {
      setSelectedTask(null);
    }
  }, [id]);

  return loading ? (
    <div className="py-10">
      <Loading />
    </div>
  ) : (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <Title title={selectedTask ? selectedTask.title : "Projects"} />
      </div>
      
      <Tabs tabs={TABS}>
        {selectedTask ? (
          <ProjectDetails tasks={selectedTask.subTasks} />
          
        ) : (
          <>
            <div className="w-full flex justify-between gap-4 md:gap-x-12 py-4">
              <TaskTitle label="To Do" className={TASK_TYPE.todo} />
              <TaskTitle
                label="In Progress"
                className={TASK_TYPE["in progress"]}
              />
              <TaskTitle label="completed" className={TASK_TYPE.completed} />
            </div>

            <BoardView tasks={tasks} />
          </>
        )}
      </Tabs>
    </div>
  );
};

export default Detail;